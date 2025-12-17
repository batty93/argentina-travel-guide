import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCurrency } from '../../src/composables/useCurrency'

describe('useCurrency composable', () => {
    let origFetch

    beforeEach(() => {
        origFetch = global.fetch
    })
    afterEach(() => {
        global.fetch = origFetch
        vi.restoreAllMocks()
    })

    it('fetches rates and computes converted amount', async () => {
        // mock fetch to return a rate of 200 for ARS
        global.fetch = vi.fn(() => Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ data: { ARS: 200 } }),
        }))

        const TestComp = {
            template: `<div><span id="out">{{ convertedAmount }}</span></div>`,
            setup() {
                const baseAmount = ref(100)
                const { convertedAmount, isLoading, error } = useCurrency('USD', 'ARS', baseAmount)
                return { convertedAmount, isLoading, error }
            }
        }

        const wrapper = mount(TestComp)

        // Wait for the composable to finish fetching
        await nextTick()
        // ensure the promise resolved
        await new Promise(r => setTimeout(r, 0))

        expect(global.fetch).toHaveBeenCalled()
        const text = wrapper.find('#out').text()
        expect(Number(text)).toBeCloseTo(20000)
    })
})
