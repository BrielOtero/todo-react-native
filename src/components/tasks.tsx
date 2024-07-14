import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import Task from "./task";

const Tasks = () => {
  const { tasks, selectedCategory } = useGlobalStore();

  if (!selectedCategory) {
    return null;
  }
  const taskInCurrentCategory = tasks.filter(
    (task) => task.category_id === selectedCategory.id
  );

  return (
    <Box flex={1} px="2">
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        data={taskInCurrentCategory}
        keyExtractor={(task: ITask) => {
          return task.id;
        }}
        renderItem={({ item: task }) => <Task task={task} />}
      />
    </Box>
  );
};

export default Tasks;

const styles = StyleSheet.create({});
