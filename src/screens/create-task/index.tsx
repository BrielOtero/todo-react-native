import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "@/utils/theme";
import { Picker } from "@react-native-picker/picker";
import useGlobalStore from "@/store";
import { nanoid } from "nanoid/non-secure";
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigation-back";

const CreateTask = () => {
  const { categories, selectedCategory, addTask, updateSelectedCategory } =
    useGlobalStore();
  const navigation = useNavigation();

  const [newTask, setNewTask] = useState<ITask>({
    id: `task_${nanoid()}`,
    name: "",
    category_id: selectedCategory?.id ?? "",
    completed: false,
  });

  const handleCreateTask = () => {
    // console.log("newTask", JSON.stringify(newTask, null, 2));
    addTask(newTask);
    const currentCategory = categories.find(
      (categoryItem) => categoryItem.id === newTask.category_id
    );
    if (currentCategory) {
      updateSelectedCategory(currentCategory);
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} bg="gray100" p="4" style={{ paddingBottom: 100 }}>
        <NavigateBack />
        <Box height={20} />
        <Box
          height={"100%"}
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            width="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              variant="textBase"
              py="1"
              textAlign="left"
              pl="1"
              style={{ width: "100%" }}
            >
              Task name
            </Text>
            <Box
              width={"100%"}
              bg="white"
              borderRadius="roundedXl"
              alignItems="center"
              justifyContent="center"
              p="4"
            >
              <TextInput
                style={{ fontSize: 20, width: "100%" }}
                placeholder="Create new task"
                value={newTask.name}
                onChangeText={(text) => {
                  setNewTask((prev) => {
                    return {
                      ...prev,
                      name: text,
                    };
                  });
                }}
              />
            </Box>
            <Box height={20}></Box>
            <Text
              variant="textBase"
              py="1"
              textAlign="left"
              pl="1"
              style={{ width: "100%" }}
            >
              Category
            </Text>
            <Box
              width={"100%"}
              bg="white"
              borderRadius="roundedXl"
              px="1"
              py="2"
            >
              <Picker
                selectedValue={newTask.category_id}
                onValueChange={(itemValue) => {
                  const currentCategory = categories.find(
                    (categoryItem) => categoryItem.id === itemValue
                  );
                  if (currentCategory) {
                    setNewTask((task) => {
                      return {
                        ...task,
                        category_id: currentCategory.id,
                      };
                    });
                  }
                }}
              >
                {categories.map((category: ICategory) => {
                  return (
                    <Picker.Item
                      style={{
                        backgroundColor: "white",
                        borderRadius: 16,
                      }}
                      key={category.id}
                      label={category.name}
                      value={category.id}
                    />
                  );
                })}
              </Picker>
            </Box>
          </Box>
          <Box
            mx="4"
            bg="blu500"
            width={"100%"}
            borderRadius="roundedXl"
            p="4"
            style={{
              marginTop: "100%",
            }}
          >
            <Pressable onPress={handleCreateTask} style={{ width: "100%" }}>
              <Text variant="textXl" textAlign="center" color="blu200">
                Create
              </Text>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
