import { CountriesType } from '@/src/enums/countries'

const countries = [
  { img: 'flag_th.png', code: CountriesType.Thailand },
  { img: 'flag_vn.png', code: CountriesType.Vietnam },
  { img: 'flag_id.png', code: CountriesType.Indonesia },
  { img: 'flag_my.png', code: CountriesType.Malaysia },
  { img: 'flag_in.png', code: CountriesType.India },
  { img: 'flag_kh.png', code: CountriesType.Cambodia },
  { img: 'flag_la.png', code: CountriesType.Laos },
  { img: 'flag_ae.png', code: CountriesType.UAE },
  { img: 'flag_tr.png', code: CountriesType.Turkey },
  { img: 'flag_ge.png', code: CountriesType.Georgia },
  { img: 'flag_am.png', code: CountriesType.Armenia },
  { img: 'flag_cn.png', code: CountriesType.China },
  { img: 'flag_ar.png', code: CountriesType.Argentina },
  { img: 'flag_az.png', code: CountriesType.Azerbaijan },
  { img: 'flag_br.png', code: CountriesType.Brazil },
  { img: 'flag_by.png', code: CountriesType.Belarus },
  { img: 'flag_kz.png', code: CountriesType.Kazakhstan },
  { img: 'flag_kg.png', code: CountriesType.Kyrgyzstan },
  { img: 'flag_tm.png', code: CountriesType.Turkmenistan },
  { img: 'flag_tj.png', code: CountriesType.Tajikistan },
  { img: 'flag_uz.png', code: CountriesType.Uzbekistan },
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 14,
  },
  largeDesktop: {
    breakpoint: { max: 2000, min: 1540 },
    items: 12,
  },
  desktop: {
    breakpoint: { max: 1540, min: 1200 },
    items: 10,
  },
  largeTablet: {
    breakpoint: { max: 1200, min: 980 },
    items: 10,
  },
  tablet: {
    breakpoint: { max: 980, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
}

export { countries, responsive }
