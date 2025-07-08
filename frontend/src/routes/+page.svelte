<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";

  let menuVisible = $state(false);
  let menuX = $state(0);
  let menuY = $state(0);
  let menuAppId = $state("");

  function openMenu(event: MouseEvent, appId: string) {
    event.stopPropagation();

    menuVisible = true;
    menuAppId = appId;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    menuX = event.clientX;
    menuY = rect.bottom + window.scrollY;
  }

  function closeMenu() {
    menuVisible = false;
    menuAppId = "";
  }

  function openApp(appId: string) {
    window.open(`//${appId}.${location.host}`, "_blank");
    closeMenu();
  }

  async function uninstallApp(appId: string) {
    if (confirm("Are you sure?")) {
      const req = await fetch(`/home-api/apps/${appId}`, { method: "DELETE" });
      if (req.ok) {
        const appElement = document.getElementById(appId);
        if (appElement) {
          appElement.remove();
        }
      } else {
        alert("Failed to uninstall the app. Please try again.");
      }
    }
    closeMenu();
  }

  // Close menu on outside click
  onMount(() => {
    const handler = (e: MouseEvent) => {
      if (menuVisible) closeMenu();
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  });
</script>

<style>
  .apps {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(131px, 1fr));
    gap: 20px;
    margin: 20px;
    width: 100%;
  }

  .app {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    user-select: none;
    height: 80px;
    width: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .app>.content {
    position: relative;
    bottom: 5px;
  }

  .app>.content>.top>.menu-opener {
    margin-left: 90px;
    border-radius: 50px;
    border-color: #419fff;
    font-size: 14px;
    width: 25px;
    height: 25px;
  }

  .app>.content>.info {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .apps>.app>.content>.info>.icon {
    width: 60px;
    height: 60px;
  }

  .apps>.app>.content>.info>.name {
    font-size: 1.2em;
    display: block;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    height: 20px;
    width: 92px;
  }

  .apps>.app>.content>.info:hover>.name {
    color: green;
  }

  .menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    border-radius: 8px;
    user-select: none;
    z-index: 1000;
  }

  .menu > button.item {
    cursor: pointer;
    display: flex;
    background: none;
    border: none;
    width: 100%;
    padding: 10px 16px;
    text-align: left;
    font-size: 1em;
  }

  .menu > button.item:hover {
    background-color: lightgrey;
  }
</style>

<main>
  <div class="apps">
  {#each page.data.apps as app}
    <div class="app" id={app.id}>
      <div class="content">
        <div class="top">
          <button class="menu-opener" onclick={(e) => openMenu(e, app.appId)}>+</button>
        </div>
        <a class="info" href={`//${app.appId}.${page.url.host}`} target="_blank">
        <img class="icon" src={app.icon || "https://placehold.co/60"} alt="App icon" />
        <span class="name">{app.name}</span>
        </a>
      </div>
    </div>
    {/each}
  </div>
</main>

{#if menuVisible}
  <div class="menu" style="left: {menuX}px; top: {menuY}px;">
    <button class="item" onclick={() => openApp(menuAppId)}>Open</button>
    <button class="item" onclick={() => uninstallApp(menuAppId)}>Uninstall</button>
  </div>
{/if}
