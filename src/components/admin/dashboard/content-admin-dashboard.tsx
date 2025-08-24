"use client"
import {
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// import { useState } from "react"
import { AddWebtoonModal, TSelectOptions } from "./add-dialog"
import { EditWebtoonModal } from "./edit-dialog"
// import { SearchAdmin } from "../search-admin"
import { useGetVolumes } from "@/hooks/dashboard/useGetVolumes"
import { ContentAdminMainDashboard } from "./content-admin-main-dashboard";
import { memo, useCallback, useEffect, useState } from "react";
import { GroupBase } from "react-select";

export const ContentAdminDashboard = memo(function () {
  const [webtoons, setWebtoons] = useState<WebtoonList>([]);
  const [options, setOptions] = useState<readonly (TSelectOptions | GroupBase<TSelectOptions>)[]>([]);

  const {
    setIsAddModalOpen,
    isAddModalOpen,
    isEditModalOpen,
  } = useGetVolumes();

  const openModal = useCallback(
    () => setIsAddModalOpen(true),
    [ isAddModalOpen ]
  );
  
   /**
     * Get categories
     */
  useEffect(() => {
    fetch("/api/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json()).then(data => {
        if(data["status"] == "201") {
            if(data["data"]) {
                const newData = data["data"].map((tag: WebtoonTags) => {
                    return {
                        value: tag.webtoon_tag_name ?? "",
                        label: tag.webtoon_tag_name ?? "" // visible label
                    }
                })
                if(newData) {
                  setOptions(newData);
                }
            }
        }
    });
  }, [])
  
  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {/* <SearchAdmin setWebtoons={setWebtoons}/> */}
          
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1" onClick={openModal}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap" >
                Add Webtoon
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Suzu Webtoons</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentAdminMainDashboard/>
            </CardContent>
            <CardFooter>
              {/* <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>{volumes}</strong> webtoons
              </div> */}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {(isAddModalOpen && <AddWebtoonModal options={options}/>)}
      {(isEditModalOpen && <EditWebtoonModal options={options}/>)}
    </>
  );
})

ContentAdminDashboard.displayName = 'ContentAdminDashboard'