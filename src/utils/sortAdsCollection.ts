import { AdsState } from '@/src/types/models'
import checkLargeAd from '@/src/utils/checkLargeAd'
import { isEmpty } from 'lodash'

const sortAdsCollection = (collectionArray: AdsState[], isMobile: boolean) => {
  if (isEmpty(collectionArray)) return []
  let collection = [...collectionArray]
  let counter = 0
  let i = 0
  while (i < collection.length) {
    const { largeBefore } = collection[i]
    const isLarge = largeBefore && checkLargeAd(largeBefore.iso)

    if ((isMobile ? counter % 2 != 0 : (counter + 1) % 3 === 0) && isLarge) {
      const prevItem = collection[i - 1]

      if (prevItem && (!prevItem.largeBefore || !checkLargeAd(prevItem.largeBefore.iso))) {
        const buffer = collection[i]
        collection[i] = prevItem
        collection[i - 1] = buffer
      } else {
        let j = i + 1
        while (j < collection.length) {
          const { largeBefore: largeBeforeNext } = collection[j]
          if (!largeBeforeNext || !checkLargeAd(largeBeforeNext.iso)) {
            const buffer = collection[j]
            for (let k = j; k > i; k--) {
              collection[k] = collection[k - 1]
            }
            collection[i] = buffer
            j = collection.length
          }
          j++
        }
      }
    }

    if (isLarge) counter += 2
    else counter += 1
    i++
  }

  return collection
}

export default sortAdsCollection
