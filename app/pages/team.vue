<template>
  <section class="py-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1
          class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
        >
          {{ $t("team.pageTitle") }}
        </h1>
      </div>

      <div
        v-for="(section, i) in sections"
        :key="section.id"
        :data-landmark="i === 0 ? 'team' : undefined"
        :class="section.id === 'roboticsConsultants' ? '' : 'mb-16'"
      >
        <h3
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-500 pl-4"
        >
          {{ $t(`team.sections.${section.id}`) }}
        </h3>
        <div :class="section.grid">
          <TeamMemberCard
            v-for="member in section.members"
            :key="member.urlname"
            :name="member.title"
            :title="member.role"
            :image="member.image"
            :link="member.link"
          >
            <template #description>
              {{ member.bio }}
            </template>
          </TeamMemberCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// 分區的順序、標題與版面排列屬於版面結構，留在程式碼；
// 成員資料改由 content/team/ 提供，承辦人可從編輯後台維護。
const piGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
const memberGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";
const SECTION_ORDER = [
  { id: "pi", grid: piGrid },
  { id: "sigagent", grid: memberGrid },
  { id: "sigrobot", grid: memberGrid },
  { id: "agenticConsultants", grid: memberGrid },
  { id: "roboticsConsultants", grid: memberGrid },
] as const;

const collection = computed(() => (locale.value === "en" ? "team_en" : "team"));

const { data: members } = await useAsyncData(
  () => `team-${locale.value}`,
  () => queryCollection(collection.value).all(),
  { watch: [collection] },
);

const sections = computed(() =>
  SECTION_ORDER.map((sec) => ({
    ...sec,
    members: (members.value ?? [])
      .filter((m) => !m.draft && m.section === sec.id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  })).filter((sec) => sec.members.length > 0),
);
</script>
