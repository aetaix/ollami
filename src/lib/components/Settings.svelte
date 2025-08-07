<script lang="ts">
  import { Dialog } from "bits-ui";
</script>
 
<Dialog.Root>
  <Dialog.Trigger class="text-sm opacity-50 hover:opacity-100">Settings</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80" />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>