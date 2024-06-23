import React, { forwardRef, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { cities } from '@/lib/cities-list'
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onLocationSelect: (location: string) => void
}

export const LocationInput = forwardRef<HTMLInputElement, Props>(
  function LocationInput({ onLocationSelect, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState('')
    const [citiesList, setCitiesList] = useState<string[]>([])
    const [hasFocus, setFocus] = useState(false)
    useEffect(() => {
      if (!locationSearchInput) return
      const timeout = setTimeout(() => {
        if (locationSearchInput === '') {
          setCitiesList([])
        } else {
          const searchWords = locationSearchInput.split(' ')
          setCitiesList(
            cities
              .map(
                (city) => `${city.name}, ${city.subcountry}, ${city.country}`
              )
              .filter((city) => {
                return (
                  city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
                  searchWords.every((word) =>
                    city.toLowerCase().includes(word.toLowerCase())
                  )
                )
              })
              .slice(0, 5)
          )
        }
      }, 300)

      return () => {
        clearTimeout(timeout)
      }
    }, [locationSearchInput])
    return (
      <div className="relative">
        <Input
          placeholder="Search for a city..."
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...props}
          ref={ref}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!citiesList.length && <p className="p-3">No results found.</p>}
            {citiesList.map((city) => (
              <button
                key={city}
                className="block w-full p-2 text-start"
                onMouseDown={(e) => {
                  e.preventDefault()
                  onLocationSelect(city)
                  setLocationSearchInput('')
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

// import { cities } from '@/lib/cities-list'
// import { forwardRef, useMemo, useState } from 'react'
// import { Input } from './ui/input'

// interface LocationInputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   onLocationSelect: (location: string) => void
// }

// export const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
//   function LocationInput({ onLocationSelect, ...props }, ref) {
//     const [locationSearchInput, setLocationSearchInput] = useState('')
//     const [hasFocus, setHasFocus] = useState(false)

//     const citiesList = useMemo(() => {
//       if (!locationSearchInput.trim()) return []

//       const searchWords = locationSearchInput.split(' ')

//       return cities
//         .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
//         .filter(
//           (city) =>
//             city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
//             searchWords.every((word) =>
//               city.toLowerCase().includes(word.toLowerCase())
//             )
//         )
//         .slice(0, 5)
//     }, [locationSearchInput])
//     return (
//       <div className="relative">
//         <Input
//           placeholder="Search for a city..."
//           type="search"
//           value={locationSearchInput}
//           onChange={(e) => setLocationSearchInput(e.target.value)}
//           onFocus={() => setHasFocus(true)}
//           onBlur={() => setHasFocus(false)}
//           {...props}
//           ref={ref}
//         />
//         {locationSearchInput.trim() && hasFocus && (
//           <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
//             {!citiesList.length && <p className="p-3">No results found.</p>}
//             {citiesList.map((city) => (
//               <button
//                 key={city}
//                 className="block w-full p-2 text-start"
//                 onMouseDown={(e) => {
//                   e.preventDefault()
//                   onLocationSelect(city)
//                 }}
//               >
//                 {city}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     )
//   }
// )
