<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Destinations</template>

    From the bustling streets of <strong>Buenos Aires</strong> to the glaciers of 
    <strong>Patagonia</strong> and the thunderous <strong>Iguazu Falls</strong>, 
    Argentina offers diverse landscapes for every traveler.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Gastronomy</template>

    Savor the world-famous <strong>Asado</strong> (BBQ), enjoy a glass of 
    <strong>Malbec</strong> wine from Mendoza, and treat yourself to delicious 
    <strong>Empanadas</strong> and <strong>Dulce de Leche</strong>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Culture</template>

    Experience the passion of the <strong>Tango</strong> in San Telmo, or witness the 
    intense atmosphere of a local <strong>football match</strong>. Argentina's cultural 
    heritage is rich and vibrant.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Travel Tips</template>

    Be mindful of the currency exchange rates. The <strong>Blue Dollar</strong> rate 
    often provides better value for cash exchanges compared to the official rate.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Planning</template>

    The country is vast! Plan your itinerary carefully. Domestic flights are often 
    necessary to travel between regions like Salta in the north and Ushuaia in the south.
  </WelcomeItem>
</template>
