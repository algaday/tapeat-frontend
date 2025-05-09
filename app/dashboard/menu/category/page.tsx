import dynamic from "next/dynamic"

const Category = dynamic(() => import("@/pages/category/category"))
export default function CategoryPage() {
	return <Category />
}
