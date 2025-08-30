import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { THEAME_COLOR, WHITE, BLACK, TRANSPARENT, BORDER_COLOR } from "../../constants";

interface Props {
  visible: boolean;
  selectedFilter: "all" | "completed" | "pending";
  onClose: () => void;
  onSelect: (filter: "all" | "completed" | "pending") => void;
}

const FilterModal: React.FC<Props> = ({ visible, selectedFilter, onClose, onSelect }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.filterMenu}>
          {["all", "completed", "pending"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterOption,
                selectedFilter === type && styles.activeFilter,
              ]}
              onPress={() => {
                onSelect(type as "all" | "completed" | "pending");
                onClose();
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === type && styles.activeFilterText,
                ]}
              >
                {type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: TRANSPARENT,
    alignItems: "flex-end",
    padding: 15,
    top:95
  },
  filterMenu: {
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 10,
    width: 150,
    elevation: 5,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderColor:BORDER_COLOR,
  },
  filterText: {
    fontSize: 16,
    color: BLACK,
  },
  activeFilter: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  activeFilterText: {
    color: THEAME_COLOR,
    fontWeight: "bold",
  },
});
