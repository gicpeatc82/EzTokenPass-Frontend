import type { NextPage } from 'next';
import Layout from '../../src/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import MemberLayout from '../../src/components/layout/MemberLayout';
import MemberTab from '../../src/components/tabs/MemberTab';

const MyInfoPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout t={t}>
      <>
        <MemberLayout>
          <MemberTab t={t} tabValue={1} />
        </MemberLayout>
      </>
    </Layout>
  );
};

export default MyInfoPage;
