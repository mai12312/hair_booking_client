import { EmptyItem, EmptyParagraph, EmptyWrapper } from "@/components/ui/empty-item";

export function EmptyContentAdmin( {message}: {message: string}) {
    return (
        <EmptyWrapper>
            <EmptyItem>
                <EmptyParagraph>{message}</EmptyParagraph>
            </EmptyItem>
        </EmptyWrapper>
    )
}