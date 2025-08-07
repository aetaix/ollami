<script lang="ts">
  import { Dialog } from "bits-ui";
</script>
 
<Dialog.Root>
  <Dialog.Trigger class="text-sm opacity-50 hover:opacity-100">Settings</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
    <Dialog.Content class="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 p-4 fixed max-w-xl w-full z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border">
      <Dialog.Title class="text-lg">
        Settings
      </Dialog.Title>
      <Dialog.Description> 
        Update your local Ollami
      </Dialog.Description>
      <div>
        
      </div>
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>