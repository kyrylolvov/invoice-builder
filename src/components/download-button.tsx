import { DownloadIcon } from "lucide-react";
import * as React from "react";

import { Button, ButtonProps } from "~/components/ui/button";

export function DownloadButton(props: ButtonProps) {
  return (
    <Button size="icon" {...props}>
      <DownloadIcon />
    </Button>
  );
}
