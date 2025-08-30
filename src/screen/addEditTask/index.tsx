import React, { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    LayoutAnimation,
    View,
    Keyboard,
} from "react-native";
import { load, store } from "../../utils/storage";
import { Task } from "../../types";
import style from "./style";
import { BLACK, Images, RED, Strings } from "../../constants";
import Header from "../../component/header";
import { createTodoRemote, deleteTodoRemote, updateTodoRemote } from "../../services/api";

const TASK_KEY = "tasks_v1";

const AddEditTask: React.FC<any> = ({ navigation, route }) => {
    const editing: Task | undefined = route.params?.task;

    const [title, setTitle] = useState<string>(editing?.title ?? "");
    const [description, setDescription] = useState<string>(
        editing?.description ?? ""
    );

    const saveTask = async () => {
        const trimmedTitle = title.trim();
        const trimmedDesc = description.trim();

        if (!trimmedTitle) {
            Alert.alert("Validation", "Title is required!");
            return;
        }

        try {
            const existingTasks = (await load<Task[]>(TASK_KEY, [])) ?? [];
            let updatedTasks: Task[];

            if (editing) {
                // UPDATE TASK LOCALLY
                updatedTasks = existingTasks.map((t) =>
                    t.id === editing.id
                        ? { ...t, title: trimmedTitle, description: trimmedDesc }
                        : t
                );

                // TRY TO UPDATE REMOTELY (FAIL SAFE)
                try {
                    await updateTodoRemote(editing.id, {
                        title: trimmedTitle,
                        description: trimmedDesc,
                    });
                } catch (e) {
                    console.warn("Update API failed, saved locally.");
                }
            } else {
                // CREATE NEW TASK LOCALLY
                const newTask: Task = {
                    id: Date.now(),
                    title: trimmedTitle,
                    description: trimmedDesc,
                    completed: false,
                };
                updatedTasks = [newTask, ...existingTasks];

                // TRY TO CREATE REMOTELY (FAIL SAFE)
                try {
                    await createTodoRemote(newTask);
                } catch (e) {
                    console.warn("Create API failed, saved locally.");
                }
            }

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            await store(TASK_KEY, updatedTasks);

            // NAVIGATE BACK WITH REFRESH FLAG
            navigation.navigate("BottomTabBar", { refresh: true });

            Alert.alert("Success", editing ? "Task updated successfully!" : "Task added successfully!");
        } catch (error) {
            console.error("Failed to save task:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const deleteTask = async () => {
        Keyboard.dismiss();
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const existingTasks = (await load<Task[]>(TASK_KEY, [])) ?? [];
                            const updatedTasks = existingTasks.filter((t) => t.id !== editing?.id);

                            // TRY TO DELETE REMOTELY (FAIL SAFE)
                            try {
                                if (editing) {
                                    await deleteTodoRemote(editing.id);
                                }
                            } catch (e) {
                                console.warn("Delete API failed, deleted locally.");
                            }

                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            await store(TASK_KEY, updatedTasks);

                            navigation.navigate("BottomTabBar", { refresh: true });

                            Alert.alert("Deleted", "Task deleted successfully!");
                        } catch (error) {
                            console.error("Failed to delete task:", error);
                            Alert.alert("Error", "Something went wrong while deleting.");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={style.container}>
            <Header
                type="back"
                title={editing ? Strings.editNotes : Strings.addTask}
                leftImage={Images.ic_arrow_back}
                onPressLeft={() => navigation.goBack()}
            />

            <View style={style.subcontainer}>
                <TextInput
                    placeholder={Strings.title}
                    value={title}
                    onChangeText={setTitle}
                    style={style.input}
                    placeholderTextColor={BLACK}
                />

                <TextInput
                    placeholder={Strings.description}
                    value={description}
                    onChangeText={setDescription}
                    style={[style.input, style.area]}
                    multiline
                    placeholderTextColor={BLACK}
                />

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                        style={[style.button, { flex: 1 }]}
                        onPress={saveTask}
                        activeOpacity={0.8}
                    >
                        <Text style={style.buttonText}>
                            {editing ? Strings.update : Strings.save}
                        </Text>
                    </TouchableOpacity>

                    {editing && (
                        <TouchableOpacity
                            style={[style.button, { backgroundColor: RED, flex: 1 }]}
                            onPress={deleteTask}
                            activeOpacity={0.8}
                        >
                            <Text style={style.buttonText}>{Strings.delete}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default AddEditTask;
