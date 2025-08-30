import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  LayoutAnimation,
  UIManager,
  FlatList,
  Alert,
  Image,
} from "react-native";
import styles from "./style";
import { Task } from "../../types";
import { load, store } from "../../utils/storage";
import { fetchTodos, updateTodoRemote } from "../../services/api";
import TaskCard from "../../component/taskCard";
import EmptyState from "../../component/emptyState";
import FilterModal from "../../component/filterModal";
import { BLACK, Strings, Images } from "../../constants";
import Header from "../../component/header";
import { useIsFocused } from "@react-navigation/native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home: React.FC<any> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const mergeTasks = (local: Task[] = [], api: Task[] = []) => {
    const merged = [...local];
    api.forEach((task) => {
      if (!merged.some((t) => t.id === task.id)) {
        merged.push(task);
      }
    });
    return merged;
  };

  const fetchTasks = useCallback(async () => {
    try {
      const localTasks = (await load<Task[]>("tasks")) || [];
      const apiTasks = (await fetchTodos()) || [];
      const mergedTasks = mergeTasks(localTasks, apiTasks);
      setTasks(mergedTasks);
      await store("tasks", mergedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused, fetchTasks]);

  const persistTasks = useCallback(async (updated: Task[]) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(updated);
    await store("tasks", updated);
  }, []);

  const toggleStatus = useCallback(
    async (id: number) => {
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      await persistTasks(updated);
      const changedTask = updated.find((t) => t.id === id);
      if (changedTask) {
        await updateTodoRemote(id, { completed: changedTask.completed });
      }
    },
    [tasks, persistTasks]
  );

  const confirmDelete = useCallback(
    (id: number) => {
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              const updated = tasks.filter((t) => t.id !== id);
              await persistTasks(updated);
            },
          },
        ],
        { cancelable: true }
      );
    },
    [tasks, persistTasks]
  );

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "completed"
          ? t.completed
          : !t.completed;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const renderTask = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        task={item}
        onToggle={() => toggleStatus(item.id)}
        onEdit={() => navigation.navigate("AddEditTask", { task: item })}
        onDelete={() => confirmDelete(item.id)}
      />
    ),
    [toggleStatus, confirmDelete, navigation]
  );

  return (
    <View style={styles.container}>
      <Header type="default" title={Strings.tasks} />

      <View style={styles.subcontainer}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={Strings.searchTasks}
            value={search}
            placeholderTextColor={BLACK}
            onChangeText={setSearch}
            style={styles.search}
          />

          <TouchableOpacity
            style={styles.filterIconWrapper}
            onPress={() => setFilterModalVisible(true)}
            activeOpacity={0.7}
          >
            <Image
              source={Images.ic_filter}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <FilterModal
          visible={filterModalVisible}
          selectedFilter={filter}
          onClose={() => setFilterModalVisible(false)}
          onSelect={(value) => setFilter(value)}
        />

        {visibleTasks.length === 0 ? (
          <EmptyState
            title={Strings.noItems}
            subtitle={Strings.addSomethingToGetStarted}
          />
        ) : (
          <>
            <Text style={styles.noteHeader}>{Strings.tasks}:</Text>
            <FlatList
              data={visibleTasks}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderTask}
              showsVerticalScrollIndicator={false}
              initialNumToRender={6}
              maxToRenderPerBatch={10}
              removeClippedSubviews
            />
          </>
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddEditTask")}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
