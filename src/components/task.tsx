import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Box, Theme, Text } from "@/utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import useGlobalStore from "@/store";
import { useNavigation } from "@react-navigation/native";

type TaskProps = {
  task: ITask;
};
const Task = ({ task }: TaskProps) => {
  const theme = useTheme<Theme>();
  const { toggleTaskStatus } = useGlobalStore();
  const navigation = useNavigation();

  return (
    <Box bg="white" borderRadius="rounded2Xl" flex={1}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable
          onPress={() => toggleTaskStatus(task)}
          onLongPress={() => {
            navigation.navigate("EditTask", {
              task,
            });
          }}
          style={{ width: "100%" }}
        >
          <Box
            p="4"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <FontAwesome
              name="square"
              size={24}
              color={
                task.completed ? theme.colors.green500 : theme.colors.gray200
              }
            />
            <Text
              variant="textXl"
              ml="4"
              textAlign="left"
              style={{ width: "100%" }}
            >
              {task.name}
            </Text>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Task;

const styles = StyleSheet.create({});
