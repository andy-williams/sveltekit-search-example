<script context="module" lang="ts">
  const searchUrl = '/search.json'

  export async function load({ page, fetch }) {
    const searchQuery = page.query.get('q')
    const searchResult = await (await fetch(`${searchUrl}?q=${encodeURIComponent(searchQuery)}`)).json()

    return {
      status: 200,
      props: {
        searchQuery: searchQuery,
        searchResult: searchResult
      }
    }
  }
</script>

<script lang="ts">
    import { goto } from '$app/navigation'
    import { browser } from '$app/env'

    export let searchResult = {
      items: []
    }
    export let searchQuery = ''

    let onSubmit = async () => {
      let currentSearchTerm = ''

      if (browser) {
        const urlParams = new URLSearchParams(window.location.search)
        currentSearchTerm = urlParams.get('q')
      }

      if (searchQuery.trim() == currentSearchTerm?.trim())
        return

      await goto(`/?q=${encodeURIComponent(searchQuery.trim())}`, {
        keepfocus: true
      })
    }
</script>

<h1>Search</h1>
<form on:submit|preventDefault={onSubmit}>
    <input type="search" name="search" bind:value={searchQuery} /><button type="submit">Search</button>
</form>

{#if searchResult.items.length > 0}
<ul>
    {#each searchResult.items as item}
        <li>{item}</li>
    {/each}
</ul>
{:else}
    No result
{/if}