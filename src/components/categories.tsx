import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import Category from "./category";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
type CategoriesProps = {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  navigateToEditCategory: (category: ICategory) => void;
};
const Categories = ({
  bottomSheetRef,
  navigateToEditCategory,
}: CategoriesProps) => {
  const { categories, selectedCategory } = useGlobalStore();

  if (!categories) {
    return null;
  }

  return (
    <Box flex={1} mx="4" borderRadius="rounded2Xl">
      <FlatList
        data={categories}
        keyExtractor={(category: ICategory) => {
          return category.id;
        }}
        renderItem={({ item: category, index }) => (
          <Category
            bottomSheetRef={bottomSheetRef}
            category={category}
            index={index}
            navigateToEditCategory={navigateToEditCategory}
          />
        )}
      />
    </Box>
  );
};

export default Categories;

const styles = StyleSheet.create({});
