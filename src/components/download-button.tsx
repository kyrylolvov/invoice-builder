import { DownloadIcon } from "lucide-react";
import * as React from "react";

import { Button } from "./ui/button";

export function DownloadButton() {
  return (
    <Button size="icon">
      <DownloadIcon />
    </Button>
  );
}
