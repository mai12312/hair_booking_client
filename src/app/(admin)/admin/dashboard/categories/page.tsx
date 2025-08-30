
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import { ContentMainCategoriesAdmin } from "@/components/admin/dashboard/categories/content-main-categories-admin";
import { DialogAddCategoriesAdmin } from "@/components/admin/dashboard/categories/dialog-add-categories-admin";

export default function Page() {
    return (
        <Tabs defaultValue="all">
            <div className="flex flex-row-reverse items-center">
                <DialogAddCategoriesAdmin/>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ContentMainCategoriesAdmin/>
                    </CardContent>
                    <CardFooter/>
                </Card>
            </TabsContent>
        </Tabs>
    )
}