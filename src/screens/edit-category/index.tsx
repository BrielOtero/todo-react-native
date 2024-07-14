import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import { Box, Theme, Text } from "@/utils/theme";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { backgroundColor, useTheme } from "@shopify/restyle";
import useGlobalStore from "@/store";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigation-back";
import { RootStackParamList } from "@/navigation/types";

type EditCategoryRoute = RouteProp<RootStackParamList, "EditCategory">;

const EditCategory = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const { params } = useRoute<EditCategoryRoute>();
  const [newCategory, setNewCategory] = useState<ICategory>(params.category);

  const {
    updateCategories,
    categories,
    updateSelectedCategory,
    colors,
    updateTasks,
    tasks,
  } = useGlobalStore();

  const handleEditCategory = () => {
    // console.log(`newCategory`, JSON.stringify(newCategory, null, 2));
    const updatedCategories = categories.map((categoryItem: ICategory) => {
      if (categoryItem.id === newCategory.id) {
        return {
          ...newCategory,
        };
      } else {
        return categoryItem;
      }
    });

    updateCategories(updatedCategories);
    updateSelectedCategory(newCategory);
    navigation.navigate("Home");
  };

  const handleDeleteWarning = () =>
    Alert.alert(
      "Warning",
      `All tasks in ${newCategory.name.toUpperCase()} will be deleted`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDeleteCategory,
        },
      ]
    );

  const handleDeleteCategory = () => {
    // console.log("newTask", JSON.stringify(newTask, null, 2));
    // Delete tasks
    const updatedTasks = tasks.filter(
      (taskItem) => taskItem.category_id !== newCategory.id
    );
    updateTasks(updatedTasks);
    // Delete categories
    const updatedCategories = categories.filter(
      (categoryItem: ICategory) => categoryItem.id !== newCategory.id
    );
    updateCategories(updatedCategories);

    var currentCategory;
    if (categories.length > 0) {
      currentCategory = categories[0];
    }
    if (currentCategory) {
      updateSelectedCategory(currentCategory);
    }
    navigation.navigate("Home");
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
            width={"100%"}
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
              Category name
            </Text>
            <Box
              width={"100%"}
              bg="white"
              borderRadius="rounded2Xl"
              alignItems="center"
              justifyContent="center"
              p="4"
            >
              <TextInput
                placeholder="Create new category"
                style={{ fontSize: 20, width: "100%" }}
                value={newCategory.name}
                onChangeText={(text) => {
                  setNewCategory((prev) => {
                    return {
                      ...prev,
                      name: text,
                    };
                  });
                }}
              />
            </Box>
            <Box height={20} />
            <Text
              variant="textBase"
              py="1"
              textAlign="left"
              pl="1"
              style={{ width: "100%" }}
            >
              Color
            </Text>
            <Box
              width={"100%"}
              bg="white"
              borderRadius="roundedXl"
              px="1"
              py="2"
            >
              <Picker
                selectedValue={newCategory.color.id}
                onValueChange={(itemValue, itemIdex) => {
                  const currentColor = colors.find(
                    (color: IColor) => color.id === String(itemValue)
                  );
                  if (currentColor) {
                    setNewCategory((prev) => {
                      return {
                        ...prev,
                        color: currentColor,
                      };
                    });
                  }
                }}
                style={{
                  backgroundColor: theme.colors.white,
                  borderRadius: 16,
                }}
              >
                {colors.map((color: IColor) => (
                  <Picker.Item
                    style={{ color: color.code }}
                    key={color.id}
                    label={color.name}
                    value={color.id}
                  />
                ))}
              </Picker>
            </Box>
            <Box
              mx="4"
              bg="red500"
              width={"100%"}
              borderRadius="roundedXl"
              p="4"
              style={{ marginTop: "90%" }}
            >
              <Pressable
                onPress={handleDeleteWarning}
                style={{ width: "100%" }}
              >
                <Text variant="textXl" textAlign="center" color="red200">
                  Delete
                </Text>
              </Pressable>
            </Box>
            <Box
              mx="4"
              bg="blu500"
              width={"100%"}
              borderRadius="roundedXl"
              p="4"
              style={{ marginTop: 20 }}
            >
              <Pressable onPress={handleEditCategory} style={{ width: "100%" }}>
                <Text variant="textXl" textAlign="center" color="blu200">
                  Edit
                </Text>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditCategory;

const styles = StyleSheet.create({});
function updateSelectedCategory(currentCategory: any) {
  throw new Error("Function not implemented.");
}
