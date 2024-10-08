'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useTransition } from 'react'
import { useLocale } from 'use-intl'

export default function LocaleSwitcher() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const localActive = useLocale()

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value
        startTransition(() => {
            console.log(nextLocale);
            router.replace(`/${nextLocale}`)
        })
    }

    return (
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <select
                value={localActive}
                className="md:w-full"
                name="dropdown"
                id="dropdown"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">English</option>
                <option value="gr">Greece</option>
            </select>
        </div>
    )
}
