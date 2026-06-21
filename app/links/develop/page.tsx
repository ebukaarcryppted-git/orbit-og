import CategoryView from "@/components/CategoryView";
import { categories } from "@/lib/links";

export default function DevelopCategoryPage() {
  return <CategoryView category={categories.develop} />;
}
