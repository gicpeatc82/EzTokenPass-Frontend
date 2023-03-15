import { useState } from 'react';

function usePage(data?: { defaultPage?: number; defaultLimit?: number }) {
  const [page, setPage] = useState(data?.defaultPage ? data?.defaultPage : 1);
  const limit = data?.defaultLimit ? data?.defaultLimit : 10;
  const offset = limit * (page - 1);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangePageAddOnePage = () => {
    setPage(page + 1);
  };

  return {
    page,
    handleChangePage,
    handleChangePageAddOnePage,
    limit,
    offset,
  };
}

export default usePage;
