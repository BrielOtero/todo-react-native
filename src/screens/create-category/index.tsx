import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import { Box, Theme, Text } from "@/utils/theme";
import { getColors } from "@/utils/helpers";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { backgroundColor, useTheme } from "@shopify/restyle";
import useGlobalStore from "@/store";
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigation-back";

const CreateCategory = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const [newCategory, setNewCategory] = useState({
    id: `category-${nanoid()}`,
    color: {
      code: "",
      id: `color-${nanoid()}`,
      name: "",
    },
    name: "",
  });

  const { addCategory, updateSelectedCategory, colors } = useGlobalStore();

  const handleOnCreateCategory = () => {
    // console.log(`newCategory`, JSON.stringify(newCategory, null, 2));
    if (newCategory.name.length > 0) {
      addCategory(newCategory);
      updateSelectedCategory(newCategory);
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
                    (color) => color.id == itemValue
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
                {colors.map((color) => (
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
              bg="blu500"
              width={"100%"}
              borderRadius="roundedXl"
              p="4"
              style={{
                marginTop: "100%",
              }}
            >
              <Pressable
                onPress={handleOnCreateCategory}
                style={{ width: "100%" }}
              >
                <Text color="blu200" variant="textXl" textAlign="center">
                  Create
                </Text>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({});
function updateSelectedCategory(currentCategory: any) {
  throw new Error("Function not implemented.");
}
