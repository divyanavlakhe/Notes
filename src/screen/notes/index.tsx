import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    FlatList,
    LayoutAnimation,
    Alert,
    Keyboard,
    Image,
} from "react-native";
import EmptyState from "../../component/emptyState";
import style from "./style";
import { load, store } from "../../utils/storage";
import { BLACK, Images, Strings } from "../../constants";
import Header from "../../component/header";

const NOTES_KEY = "notes_v1";

const Notes: React.FC<any> = ({ navigation }) => {
    const [notes, setNotes] = useState<string[]>([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const storedNotes = (await load<string[]>(NOTES_KEY, [])) ?? [];
                setNotes(storedNotes);
            } catch (error) {
                console.error("Failed to load notes:", error);
            }
        };
        fetchNotes();
    }, []);

    const persistNotes = useCallback(
        async (updated: string[]) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setNotes(updated);
            await store(NOTES_KEY, updated);
        },
        []
    );

    const addNote = useCallback(async () => {
        Keyboard.dismiss()
        if (!value.trim()) return;
        const updated = [value.trim(), ...notes];
        await persistNotes(updated);
        setValue("");
    }, [value, notes, persistNotes]);

    const deleteNote = useCallback(
        (index: number) => {
            Alert.alert(
                "Delete Note",
                "Are you sure you want to delete this note?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            const updated = notes.filter((_, i) => i !== index);
                            await persistNotes(updated);
                        },
                    },
                ]
            );
        },
        [notes, persistNotes]
    );

    const renderNote = useCallback(
        ({ item, index }: { item: string; index: number }) => (
            <View style={style.noteCard}>
                <Text style={style.note}>{item}</Text>
                <TouchableOpacity
                    onPress={() => deleteNote(index)}
                    style={{ alignItems: 'center' }}
                    activeOpacity={0.8}
                >
                     <Image source={Images.ic_delete} style={style.icon} />
                </TouchableOpacity>
            </View>
        ),
        [deleteNote]
    );

    return (
        <View style={style.container}>

            <Header
                type="default"
                title={Strings.notes}
            />

            <View style={style.subcontainer}>

                <TextInput
                    placeholder={Strings.writeTasks}
                    value={value}
                    onChangeText={setValue}
                    style={style.input}
                    placeholderTextColor={BLACK}
                />

                <TouchableOpacity
                    style={[style.button, !value.trim() && style.disabledButton]}
                    onPress={addNote}
                    disabled={!value.trim()}
                    activeOpacity={0.8}
                >
                    <Text style={style.buttonText}>{Strings.addNotes}</Text>
                </TouchableOpacity>

                {notes.length === 0 ? (
                    <EmptyState title={Strings.noItems} subtitle={Strings.addSomethingToGetStarted} />
                ) : (
                    <>
                        <Text style={style.noteHeader}>{Strings.notes}:</Text>
                        <FlatList
                            data={notes}
                            keyExtractor={(_, idx) => String(idx)}
                            renderItem={renderNote}
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={6}
                            maxToRenderPerBatch={10}
                            removeClippedSubviews
                        />
                    </>
                )}
            </View>
        </View>
    );
};

export default Notes;
