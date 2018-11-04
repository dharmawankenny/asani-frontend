import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';

import {
  Blog,
  BlogTitle,
  BlogSubtitle,
  BlogText,
  BlogLink,
} from '../../components/BlogBuilder';
import { BigActionButton } from '../../components/Buttons';
import Header from '../../components/Header';
import {
  PageWrapper,
  SpinnerWrapper,
} from '../../components/PageBuilder';

export default class WhatIsACreditScore extends React.Component {
  render() {
    return (
      <Fragment>
        <Header withMenu />
        <PageWrapper>
          <Blog>
            {/* <YouTube videoId="j3YQAoN2wGM" opts={{ height: '240', width: window.innerWidth }} /> */}
            <BlogTitle margin="1.5rem 0 1rem">
              Skor kredit? apa sih itu?
            </BlogTitle>
            <BlogText>
              Apakah ada di antara kalian yang sedang mengajukan <strong>kartu kredit</strong> tapi ditolak? Atau ingin mencari <strong>modal usaha</strong> tapi sulit mendapatkan pinjaman? Atau juga kalian membutuhkan <strong>biaya besar rumah sakit</strong> atau <strong>biaya pendidikan</strong> dalam waktu singkat tapi tidak memiliki uang cash?<br /><br />
              Banyak orang yang tidak mengetahui bahwa pinjaman dan pembiayaan baik dari bank maupun institusi keuangan lainnya erat berkaitan dengan skor kredit. Apa itu skor kredit?<br /><br />
              <strong>Skor kredit</strong> adalah sistem penilaian yang digunakan apakah seseorang layak mendapatkan pinjaman atau tidak.<br /><br />
              Skor kredit dapat diumpamakan seperti rapor anak sekolah yang diberikan kepada orang tua siswa oleh sekolah setiap semesternya. Rapor ini dapat berfungsi untuk menilai dan mengevaluasi belajar seorang anak.<br /><br />
              Seperti halnya siswa, kita juga bisa menilai dan mengevaluasi apakah pinjaman yang kita ajukan sudah sesuai dengan kebutuhan kita atau belum?<br /><br />
              Skor kredit akan membantu kita mengukur apakah penghasilan yang kita punya sesuai dengan jumlah pinjaman yang kita ambil. <strong>Atau produk-produk apa saja yang bisa kita pinjam sesuai kemampuan kita.</strong><br /><br />
              Skor kredit juga dapat membantu kita untuk membiasakan diri agar disiplin dan bertanggung jawab dengan pinjaman yang sudah kita ambil.<br /><br />
            </BlogText>
            <BlogSubtitle>
              Mengapa <strong>skor kredit penting</strong> buat kamu?
            </BlogSubtitle>
            <BlogText>
              Institusi perbankan memberikan pinjaman dan kredit kepada seseorang berdasarkan <strong>keyakinan</strong> bahwa peminjam mampu mengembalikan pinjaman sesuai perjanjian (willingness to pay).<br /><br />
              Hal ini dapat diukur dari salah satu persyaratan pengajuan pinjaman yaitu <strong>BI Checking</strong>. BI Checking berisi informasi catatan tentang lancar atau macetnya pembayaran pinjaman sebelumnya yang nilainya ditentukan oleh skor kredit.<br /><br />
            </BlogText>
            <BlogSubtitle>
              Lalu bagaimana dengan kalian yang <strong>tinggal didaerah terpencil</strong> dan <strong>tidak memiliki rekening bank?</strong>
            </BlogSubtitle>
            <BlogText>
              Saat ini, tidak semua orang mempunyai akses keuangan. Masih banyak masyarakat di daerah dan petani di Indonesia yang sulit mendapatkan pinjaman. Mengapa hal itu bisa terjadi?<br /><br />
              Karena banyak dari mereka yang bahkan tidak mempunyai rekening bank dan catatan transaksi keuangan.<br /><br />
              Bahkan, jarak bank dan atm yang jauh dari rumah menyebabkan mereka lebih memilih untuk meminjam di rentenir dengan bunga yang berkali-kali lipat :(<br /><br />
            </BlogText>
            <BlogTitle>
              Apa itu Asani Skor Kredit?
            </BlogTitle>
            <BlogText>
              <strong>Asani skor kredit</strong> adalah perusahaan skor kredit yang dapat membantu kamu yang bahkan tidak memiliki catatan keuangan di bank untuk tetap mendapatkan pinjaman. Bagaimana caranya?<br /><br />
              Kalian cukup memasukkan <strong>nomor handphone</strong> di <a href={SITEMAP.CREDIT_SCORE}>link ini</a> untuk mengetahui skor kredit kalian saat ini.<br /><br />
              Jika sudah, dan kalian tertarik untuk melakukan pinjaman awal yaitu pinjaman pulsa, kalian silahkan mengunggah <strong>KTP</strong> dan <strong>foto</strong> di <a href={SITEMAP.CREDIT_SCORE}>link ini</a> untuk produk pulsa dengan nominal 10,000 s/d 100,000.<br /><br />
              Jika kalian dapat <strong>membayar pinjaman tepat waktu</strong>, maka <strong>skor kalian akan semakin bertambah</strong>. Dengan <strong>skor yang semakin bertambah</strong>, kalian bisa <strong>meminjam produk dengan nominal yang lebih besar dan dengan bunga yang lebih rendah.</strong><br /><br />
              Tapi jangan lupa ya, <strong>ketika kalian membayar tidak tepat waktu</strong>, maka <strong>skor kredit kalian juga akan turun.</strong><br /><br />
              Karena pada akhirnya, pinjaman yang kita ambil harus mampu dilunasi dalam jangka waktu yang ditentukan. Kalau tidak, kita harus membayar sejumlah denda sebagai penaltinya.<br /><br />
              Jadi, sudahkah kalian mengecek skor kredit?<br /><br />
            </BlogText>
          </Blog>
        </PageWrapper>
      </Fragment>
    );
  }
}
