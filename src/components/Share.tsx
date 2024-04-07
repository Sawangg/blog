import { useState } from "react";
import { Button } from "@ui/Button";
import { Dialog, DialogFooter } from "@ui/Dialog";
import { Heading } from "@ui/Heading";

export const Share: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(false)} plain>Share</Button>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <Heading level={2} slot="title">
          Share this post
        </Heading>
        <p></p>
        <DialogFooter>
          <Button onPress={() => setOpen(false)} plain>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

