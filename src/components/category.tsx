import { Pressable, StyleSheet, View } from "react-native";
import React, { RefObject } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import { FontAwesome } from "@expo/vector-icons";

type CategoryProps = {
  category: ICategory;
  bottomSheetRef: RefObject<BottomSheetModal>;
  index: number;
  navigateToEditCategory: (category: ICategory) => void;
};

const Category = ({
  category,
  bottomSheetRef,
  index,
  navigateToEditCategory,
}: CategoryProps) => {
  const {
    updateSelectedCategory: updatedSelectedCategory,
    selectedCategory,
    categories,
  } = useGlobalStore();

  const onUpdateSelectedCategory = (category: ICategory) => {
    updatedSelectedCategory(category);
    bottomSheetRef.current?.close();
  };

  return (
    <Pressable
      onPress={() => onUpdateSelectedCategory(category)}
      onLongPress={() => {
        navigateToEditCategory(category);
        bottomSheetRef.current?.close();
      }}
    >
      <Box
        p="4"
        bg={selectedCategory?.id === category.id ? "blu200" : "gray100"}
        key={category.id}
        flexDirection="row"
        alignItems="center"
        borderTopLeftRadius={index === 0 ? "roundedXl" : "none"}
        borderTopRightRadius={index === 0 ? "roundedXl" : "none"}
        borderBottomLeftRadius={
          index === categories.length - 1 ? "roundedXl" : "none"
        }
        borderBottomRightRadius={
          index === categories.length - 1 ? "roundedXl" : "none"
        }
      >
        <FontAwesome name="square-o" size={24} color={category.color.code} />
        <Text variant="textXl" ml="4">
          {category.name}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({});
