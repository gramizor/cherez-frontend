import { Box, Grid, Menu, Typography, useTheme } from '@mui/material'
import { categories } from '@/src/components/organisms/CategorySlider/constants'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryMainSearchParam, getCategoryParamsMainSearchParam } from '@/src/redux/selectors/mainSearch'
import { useEffect, useState } from 'react'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { OperationsEnum } from '@/src/enums/redux'
import { capitalize, isEmpty } from 'lodash'
import { searchAdsRequested, setSearchParams } from '@/src/redux/slices/mainSearch'
import { AdditionalParamSearch, CategorySearch } from '@/src/types/structs/search'

type Props = {
  handleClose: () => void
  anchorEl: null | HTMLElement
}

const CategoriesSearchDialog = ({ anchorEl, handleClose }: Props) => {
  const { t } = useTranslation('common')
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const open = Boolean(anchorEl)
  const categoryMainSearchParam = useSelector(getCategoryMainSearchParam)
  const categoryParamsMain = useSelector(getCategoryParamsMainSearchParam)

  const [selected, setSelected] = useState(categoryMainSearchParam)
  const [subSelected, setSubSelected] = useState<CategorySearch | null>(null)
  const [addSelected, setAddSelected] = useState<AdditionalParamSearch | null>(null)

  useEffect(() => {
    setSelected(categoryMainSearchParam)
  }, [open])

  const handleClick = (subcategory: CategorySearch | null) => {
    setSubSelected(subcategory)
    let categoryParams = []
    if (selected === CategoriesType.Vehicle || selected === CategoriesType.RealEstate) {
      categoryParams = [
        { operation: OperationsEnum.Equal, key: subcategories[selected].key, value: subcategory },
        ...categoryParamsMain.filter(param => param.key === KeysSubcategories.OfferType),
      ]
    } else {
      categoryParams = [{ operation: OperationsEnum.Equal, key: subcategories[selected].key, value: subcategory }]
    }
    dispatch(
      setSearchParams({
        category: selected,
        categoryParams,
      })
    )
    dispatch(searchAdsRequested())
    handleClose()
  }

  const handleClickAdditional = (additionalItem: AdditionalParamSearch | null) => {
    setAddSelected(additionalItem)
    let categoryParams = []
    if (selected === CategoriesType.Vehicle || selected === CategoriesType.RealEstate) {
      categoryParams = [
        {
          operation: OperationsEnum.Equal,
          key: subcategories[selected].additional[0].key,
          value: additionalItem,
        },
        ...categoryParamsMain.filter(param =>
          [KeysSubcategories.VehicleType, KeysSubcategories.RealEstateType].includes(param.key)
        ),
      ]
    } else {
      categoryParams = [
        { operation: OperationsEnum.Equal, key: subcategories[selected].additional[0].key, value: additionalItem },
      ]
    }
    dispatch(
      setSearchParams({
        category: selected,
        categoryParams,
      })
    )
    dispatch(searchAdsRequested())
    handleClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        '.MuiList-root': {
          padding: 0,
        },
        '.MuiPaper-root': {
          px: { xs: 8, lg: 0 },
          mx: { xs: 0, lg: 'auto' },
          width: { xs: '100%', lg: 1080, xl: 1440 },
          borderRadius: '0px 0px 30px 30px',
        },
      }}
    >
      <Box sx={{ paddingTop: 7, paddingBottom: 10, paddingLeft: 4.5, display: 'flex' }}>
        <Grid container spacing={2} sx={{ width: 377 }}>
          {categories.map((category, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelected(category)
                dispatch(
                  setSearchParams({
                    categoryParams: [],
                  })
                )
                if (subcategories[category].array.length === 0) {
                  dispatch(
                    setSearchParams({
                      category: category,
                    })
                  )
                  dispatch(searchAdsRequested())
                  handleClose()
                }
              }}
            >
              <Grid
                container
                sx={{
                  paddingTop: '2px',
                  paddingBottom: '3px',
                  paddingLeft: '19px',
                  borderRadius: '10px 0px 0px 10px',
                  backgroundColor: selected === category ? palette.customColors.lightBackground : palette.info.main,
                  '&:hover': {
                    backgroundColor: palette.customColors.lightBackground,
                    '& > h5': { color: `${palette.primary.light} !important` },
                  },
                }}
                alignItems="center"
              >
                <Image src={`/categories/icons/${category}.svg`} alt={category} width={37} height={37} />
                <Typography
                  color={selected === category ? palette.primary.main : palette.customColors.infoLabel}
                  variant="h5"
                  fontWeight={'500'}
                  sx={{ paddingLeft: 4 }}
                >
                  {t(`categories:${category}`)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        {selected && subcategories[selected].array.length > 0 && (
          <Grid
            sx={{
              // height: 'max-content',
              width: isEmpty(subcategories[selected].additional) ? 377 : 287,
              borderRadius: '5px',
              background: palette.customColors.lightBackground,
              marginLeft: '-5px',
            }}
          >
            <Grid container flexDirection="column" spacing={4} sx={{ paddingTop: 4, paddingLeft: 8, paddingBottom: 4 }}>
              {subcategories[selected].array.map((subcategory, index) => (
                <Grid
                  item
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      '& > h5': { color: `${palette.primary.light} !important` },
                    },
                  }}
                  onClick={() => handleClick(subcategory)}
                >
                  <Typography
                    color={subSelected === subcategory ? palette.primary.main : palette.customColors.infoLabel}
                    variant="h5"
                    fontWeight={'500'}
                    sx={{ paddingLeft: 4 }}
                  >
                    {capitalize(t(`categories:${subcategory}`))}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {selected &&
          !isEmpty(subcategories[selected]?.additional) &&
          subcategories[selected]?.additional[0].array &&
          subcategories[selected]?.checkAdditional && (
            <Grid
              sx={{
                width: isEmpty(subcategories[selected].additional) ? 377 : 287,
                borderRadius: '5px',
                background: palette.customColors.lightBackground,
                marginLeft: '-5px',
                height: 'max-content',
              }}
            >
              <Grid
                container
                flexDirection="column"
                spacing={4}
                sx={{ paddingTop: 4, paddingLeft: 8, paddingBottom: 4 }}
              >
                {subcategories[selected]?.additional[0].array.map((additionalItem, indexAdditional) => (
                  <Grid
                    item
                    key={indexAdditional}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        '& > h5': { color: `${palette.primary.light} !important` },
                      },
                    }}
                    onClick={() => handleClickAdditional(additionalItem)}
                  >
                    <Typography
                      color={addSelected === additionalItem ? palette.primary.main : palette.customColors.infoLabel}
                      variant="h5"
                      fontWeight={'500'}
                      sx={{ paddingLeft: 4 }}
                    >
                      {capitalize(t(`categories:${additionalItem}`))}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
      </Box>
    </Menu>
  )
}

export default CategoriesSearchDialog
