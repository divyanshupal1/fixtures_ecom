import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProductStore } from "@/store/productStore";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { usePathname } from "next/navigation";

export function PaginationComp() {
  const path = usePathname()
  const {pagination} = useProductStore((state)=>({
    pagination:state.pagination
  }))

  return (
    <>{
    pagination.totalPages>1 &&
    <Pagination>
      <PaginationContent>
        <PaginationItem>
            <PaginationLink isActive className={pagination.page==1 ? "pointer-events-none opacity-50" :"" }  href={path+"?page=1"}><DoubleArrowLeftIcon/></PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationPrevious className={!pagination.hasPrevPage ? "pointer-events-none opacity-50" :"" } href={path+"?page="+pagination.prevPage} />
        </PaginationItem>
        <PaginationItem>
            { (pagination.page - 2) > 0 && <PaginationEllipsis />}
        </PaginationItem>
        <PaginationItem>
            {pagination.hasPrevPage && <PaginationLink href={path+"?page="+pagination.prevPage}>{pagination.prevPage}</PaginationLink>}
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href={path+"?page="+pagination.page} isActive>{pagination.page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            {pagination.hasNextPage && <PaginationLink  href={path+"?page="+pagination.nextPage}>{pagination.nextPage}</PaginationLink>}
        </PaginationItem>
        <PaginationItem>
            { (pagination.page + 1) < pagination.page && <PaginationEllipsis />}
        </PaginationItem>
        <PaginationItem>
            <PaginationNext className={!pagination.hasNextPage ? "pointer-events-none opacity-50" :"" }  href={path+"?page="+pagination.nextPage}/>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink isActive className={pagination.page==pagination.totalPages ? "pointer-events-none opacity-50" :"" } href={path+"?page="+pagination.totalPages}><DoubleArrowRightIcon/></PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    }</>
  );
}
