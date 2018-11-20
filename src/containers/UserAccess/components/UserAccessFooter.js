import React from 'react';
import Footer from '../../../components/Footer/Footer';

import { BottomFooter, Pttext } from '../UserAccess.styled';

export default function UserAccessFooter() {
  return (
    <BottomFooter>
      <table>
        <tbody>
          <tr>
            <td width="60%">
              <Pttext>&copy; 2018 Asani</Pttext>
              <Pttext>PT Teknologi Skoring Nusantara</Pttext>
              <Pttext>
                Roxy Mas E2/35 Jl. K.H. Hasyim Ashari 125 Cideng, Gambir, Jakarta Pusat
              </Pttext>
              <Pttext>Telp: +6281311442228</Pttext>
            </td>
            <td>
              <Footer />
            </td>
          </tr>
        </tbody>
      </table>
    </BottomFooter>
  );
}
