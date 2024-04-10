import { useState } from "react";
import { Button } from "@ui/Button";
import { Dialog, DialogFooter } from "@ui/Dialog";
import { Heading } from "@ui/Heading";
import { Text } from "@ui/Text";
import { Input } from "@ui/Input";

export const Share: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)} plain>Share</Button>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <Heading level={2} slot="title">
          Share this post
        </Heading>
        <div className="space-y-4">
          <Text>Share this post by using this link on your social medias!</Text>
          <Input
            defaultValue={window.location.href}
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          />
        </div>
        <DialogFooter>
          <Button onPress={() => setOpen(false)} plain>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

