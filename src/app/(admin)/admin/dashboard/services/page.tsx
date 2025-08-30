
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
import { ContentMainServicesAdmin } from "@/components/admin/dashboard/services/content-main-services-admin";
import { DialogAddServicesAdmin } from "@/components/admin/dashboard/services/dialog-add-services-admin";

export default function Page() {
    return (
        <Tabs defaultValue="all">
            <div className="flex flex-row-reverse items-center">
                <DialogAddServicesAdmin/>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ContentMainServicesAdmin/>
                    </CardContent>
                    <CardFooter/>
                </Card>
            </TabsContent>
        </Tabs>
    )
}