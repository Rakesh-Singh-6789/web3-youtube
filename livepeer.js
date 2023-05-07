import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivePeerClient = createReactClient({
  provider: studioProvider({ apiKey: "3f2e174f-6ff2-432f-a653-0975942273f8" }),
});

export default LivePeerClient;
