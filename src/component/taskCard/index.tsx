import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { Task } from "../../types";
import {
  BORDER_COLOR,
  GRAY,
  Images,
  LIGHT_GRAY,
  RED,
  Strings,
  THEAME_COLOR,
  WHITE,
} from "../../constants";

type Props = {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskCard: React.FC<Props> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>

      <View style={styles.taskContent}>
        <Text style={styles.title}>{task.title}</Text>

        {!!task.description && <Text style={styles.desc}>{task.description}</Text>}

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: task.completed ? "#DCFCE7" : "#FEE2E2" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: task.completed ? "#16A34A" : "#DC2626" },
            ]}
          >
            {task.completed ? "✔ Completed" : "⏳ Pending"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>

         <Switch
          value={task.completed}
          onValueChange={onToggle}
          trackColor={{ false: BORDER_COLOR, true: BORDER_COLOR }}
          thumbColor={task.completed ? THEAME_COLOR : THEAME_COLOR}
          style={{ marginLeft: 5 }}
        />
      
        <ActionButton
          icon={Images.ic_edit}
          onPress={onEdit}
        />

        <ActionButton
           icon={Images.ic_delete}
          onPress={onDelete}
        />

      </View>
    </View>
  );
};

const ActionButton = ({
  icon,
  onPress,
}: {
  icon: any;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.iconButton} activeOpacity={0.7}>
    <Image source={icon} style={styles.icon} />
  </TouchableOpacity>
);

export default memo(TaskCard);

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginTop: 12,
    backgroundColor: WHITE,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: LIGHT_GRAY,
  },
  desc: {
    marginTop: 4,
    color: GRAY,
  },
  actions: {
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
  },
  iconButton: {
    padding: 5,
     marginLeft: 3,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
