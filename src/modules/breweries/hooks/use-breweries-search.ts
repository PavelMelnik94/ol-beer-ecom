import { useOnClickOutside } from '@shared/hooks'
import { useMemo, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import type { BreweryPreview } from '../types'

export function useBreweriesSearch({ breweriesList }: { breweriesList: BreweryPreview[] }) {
    const isEnabled = useMediaQuery({
        query: '(min-width: 568px)',
    })
    const [isActiveBrewerySearch, setIsActiveBrewerySearch] = useState<boolean>(false)
    const [isActiveLocationSearch, setIsActiveLocationSearch] = useState<boolean>(false)

    const breweryInputSearchRef = useRef(null)
    const locationInputSearchRef = useRef(null)

    const [search, setSearch] = useState<string>('')

    useOnClickOutside(breweryInputSearchRef, () => {
        setIsActiveBrewerySearch(false)
        setSearch('')
    })
    useOnClickOutside(locationInputSearchRef, () => {
        setIsActiveLocationSearch(false)
        setSearch('')
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const breweries = useMemo(() => {
        if (!search || !isEnabled) return breweriesList

        if (isActiveBrewerySearch) {
            return breweriesList?.filter((brewery) => {
                return brewery.name.toLowerCase().includes(search.toLowerCase())
            })
        }

        if (isActiveLocationSearch) {
            return breweriesList?.filter((brewery) => {
                return brewery.location.toLowerCase().includes(search.toLowerCase())
            })
        }
    }, [search, breweriesList, isEnabled])

    const toggleBrewerySearch = () => {
        setIsActiveLocationSearch(false)
        setIsActiveBrewerySearch(true)
    }

    const toggleLocationSearch = () => {
        setIsActiveBrewerySearch(false)
        setIsActiveLocationSearch(true)
    }

    return {
        breweries,
        showBreweriesInput: isActiveBrewerySearch && !isActiveLocationSearch,
        showLocationsInput: isActiveLocationSearch && !isActiveBrewerySearch,
        searchValue: search,
        isSearchLayout: isEnabled,
        refs: {
            location: locationInputSearchRef,
            brewery: breweryInputSearchRef,
        },

        handleSearch,
        toggleBrewerySearch,
        toggleLocationSearch,
    }
}
