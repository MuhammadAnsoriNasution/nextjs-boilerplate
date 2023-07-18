import { useState, useEffect } from 'react'
import { shallow } from 'zustand/shallow'
type TypeShallow = typeof shallow

const useStore = <T, F>(
    store: (callback: (state: T) => unknown, shallow?: unknown) => unknown,
    callback: (state: T) => F,
    shallow?: TypeShallow
) => {
    const result = store(callback, shallow) as F
    const [data, setData] = useState<F>()
    useEffect(() => {
        setData(result)
    }, [result])
    return data
}
export default useStore