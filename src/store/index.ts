import { getColors } from "@/utils/helpers"
import theme from "@/utils/theme"
import { colors } from "@/utils/theme/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface IGlobalStore {
    categories: ICategory[]
    tasks: ITask[]
    colors: IColor[]
    addColors: () => void
    addCategory: (category: ICategory) => void
    updateTasks: (tasks: ITask[]) => void
    selectedCategory: null | ICategory
    addTask: (task: ITask) => void
    updateSelectedCategory: (category: ICategory) => void
    updateCategories: (category: ICategory[]) => void
    toggleTaskStatus: (task: ITask) => void
}

const useGlobalStore = create<IGlobalStore>()(
    persist(
        (set, get) => ({
            categories: [],
            tasks: [],
            colors: [],
            addColors: () => {
                if (!colors) {
                    set({
                        colors: getColors()
                    })
                }
            },
            addTask: (task: ITask) => {
                const { tasks } = get()
                const updatedTasks = [...tasks, task]
                set({
                    tasks: updatedTasks,
                })
            },
            selectedCategory: null,
            updateTasks: (updatedTasks: ITask[]) => {
                set({
                    tasks: updatedTasks
                })
            },
            updateSelectedCategory: (category: ICategory) => {
                set({
                    selectedCategory: category,
                })
            },
            addCategory: (category: ICategory) => {
                const { categories } = get()
                const updatedCategories = [...categories, category]
                set({
                    categories: updatedCategories
                })
            },
            updateCategories: (updatedCategories: ICategory[]) => {
                set({
                    categories: updatedCategories
                })
            },
            toggleTaskStatus: (task: ITask) => {
                const { tasks } = get()
                const updatedTasks = tasks.map(taskItem => {
                    if (taskItem.id === task.id) {
                        return {
                            ...task,
                            completed: !task.completed
                        }
                    } else {
                        return taskItem
                    }
                })
                set({
                    tasks: updatedTasks
                })
            }
        }),
        {
            name: "todos-store",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)

export default useGlobalStore