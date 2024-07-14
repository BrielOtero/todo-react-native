import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Box, Text } from "@/utils/theme";
import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import useGlobalStore from "@/store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Category from "@/components/category";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CreateTaskButton from "@/components/create-task-button";
import { FlatList } from "react-native-gesture-handler";
import Tasks from "@/components/tasks";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import Categories from "@/components/categories";
import { FullWindowOverlay } from "react-native-screens";

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const isAndroid = Platform.OS === "android";
  const navigateToEditCategory = (category: ICategory) => {
    navigation.navigate("EditCategory", {
      category,
    });
  };

  const { selectedCategory, addColors } = useGlobalStore();
  addColors();
  return (
    <SafeAreaWrapper>
      <Box flex={1} bg="gray100">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt="4"
          px="4"
        >
          <Box flexDirection="row" alignItems="center">
            <FontAwesome
              name="square-o"
              size={24}
              color={selectedCategory?.color.code}
            />
            <Text variant="text2Xl" ml="4">
              {selectedCategory?.name}
            </Text>
          </Box>
          <Pressable
            onPress={() => {
              bottomSheetRef.current?.present();
            }}
          >
            <Ionicons size={32} name="filter" />
          </Pressable>
        </Box>
        <Box height={20} />
        <Tasks />
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
        >
          <Categories
            bottomSheetRef={bottomSheetRef}
            navigateToEditCategory={navigateToEditCategory}
          />

          <Box
            position="absolute"
            right={20}
            bottom={insets.bottom + (isAndroid ? 20 : 0)}
          >
            <Pressable
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate("CreateCategory");
              }}
            >
              <Box
                bg="gray200"
                width={64}
                height={64}
                borderRadius="roundedXl"
                alignItems="center"
                justifyContent="center"
              >
                <MaterialCommunityIcons name="plus" size={40} color="black" />
              </Box>
            </Pressable>
          </Box>
        </BottomSheetModal>
        <CreateTaskButton />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
