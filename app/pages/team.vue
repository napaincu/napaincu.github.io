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
        v-for="section in sections"
        :key="section.id"
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
            :key="member.key"
            :name="member.name"
            :title="$t(`team.m.${member.key}.title`)"
            :image="member.image"
            :link="member.link"
          >
            <template #description>
              {{ $t(`team.m.${member.key}.desc`) }}
            </template>
          </TeamMemberCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const piGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
const memberGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";

const sections = [
  {
    id: "pi",
    grid: piGrid,
    members: [
      {
        key: "zhang-ch",
        name: "張嘉惠 教授",
        image: "/image/team/張嘉惠.jpg",
        link: "https://sites.google.com/site/nculab/advisor",
      },
      {
        key: "dai-pi",
        name: "戴敏育 教授",
        image: "/image/team/myday_photo.jpg",
        link: "https://web.ntpu.edu.tw/~myday/",
      },
      {
        key: "hu-mj",
        name: "胡敏君 教授",
        image: "/image/team/胡敏君.jpg",
        link: "https://mislab.cs.nthu.edu.tw/",
      },
    ],
  },
  {
    id: "sigagent",
    grid: memberGrid,
    members: [
      { key: "fan", name: "范耀中 教授", image: "/image/team/SIGAgent/范耀中教授.jpg" },
      { key: "jian", name: "簡士鎰 副教授", image: "/image/team/SIGAgent/簡士鎰.jpg" },
      { key: "dai-sa", name: "戴敏育 教授", image: "/image/team/SIGAgent/戴敏育.jpg" },
      { key: "lin-hq", name: "林豪鏘 教授", image: "/image/team/SIGAgent/林豪鏘教授.png" },
      { key: "zhang-wl", name: "張瑋倫 特聘教授", image: "/image/team/SIGAgent/張瑋倫特聘教授.jpg" },
      { key: "xie-sk", name: "謝舒凱 教授", image: "/image/team/SIGAgent/謝舒凱.png" },
      { key: "zhang-yc", name: "張詠淳 教授", image: "/image/team/SIGAgent/張詠淳教授.png" },
    ],
  },
  {
    id: "sigrobot",
    grid: memberGrid,
    members: [
      { key: "yao", name: "姚智原 副教授", image: "/image/team/SIGRobot/姚智原.jpg" },
      { key: "chen-yt", name: "陳奕廷 副教授", image: "/image/team/SIGRobot/陳奕廷副教授.png" },
      { key: "ke", name: "柯宗瑋 助理教授", image: "/image/team/SIGRobot/柯宗瑋.jpg" },
      { key: "pan", name: "潘則佑 助理教授", image: "/image/team/SIGRobot/潘則佑.png" },
      { key: "zhu", name: "朱宏國 教授", image: "/image/team/SIGRobot/朱宏國.jpeg" },
      { key: "hong", name: "洪仕軒 助理教授", image: "/image/team/SIGRobot/洪仕軒.png" },
    ],
  },
  {
    id: "agenticConsultants",
    grid: memberGrid,
    members: [
      { key: "huang", name: "黃三益 特聘教授", image: "/image/team/黃三益.jpg" },
      { key: "xu", name: "許秉瑜 教授", image: "/image/team/許秉瑜.jpg" },
      { key: "jiang", name: "蔣榮先 特聘教授", image: "/image/team/蔣榮先.jpeg" },
      { key: "liu", name: "劉昭麟 特聘教授", image: "/image/team/chaolin.jpg" },
      { key: "chen-bl", name: "陳柏琳 特聘教授", image: "/image/team/陳柏琳.png" },
      { key: "wang", name: "王建彬 院長", image: "/image/team/王建彬.jpeg" },
      { key: "lin-xc", name: "林縣城 副總經理", image: "/image/team/林縣城.jpg" },
      { key: "liang", name: "梁伯嵩 資深處長", image: "/image/team/梁伯嵩.jpg" },
      { key: "cai", name: "蔡明順 校務長", image: "/image/team/蔡明順.jpg" },
    ],
  },
  {
    id: "roboticsConsultants",
    grid: memberGrid,
    members: [
      { key: "zhuang", name: "莊家峯 講座教授", image: "/image/team/莊家峯.jpg" },
      { key: "su", name: "蘇文鈺 教授", image: "/image/team/蘇文鈺.jpg" },
      { key: "li", name: "李祖聖 特聘教授", image: "/image/team/李祖聖.jpg" },
      { key: "zhang-zy", name: "張禎元 講座教授", image: "/image/team/張禎元.jpg" },
      { key: "ye", name: "葉廷仁 特聘教授", image: "/image/team/葉廷仁特聘教授.jpg" },
      { key: "zeng", name: "曾煜棋 終身講座教授", image: "/image/team/曾煜棋.jpg" },
      { key: "wu", name: "吳炳飛 講座教授", image: "/image/team/吳炳飛.jpg" },
      { key: "yang", name: "楊谷洋 教授", image: "/image/team/楊谷洋.jpg" },
      { key: "fu", name: "傅立成 講座教授", image: "/image/team/傅立成.png" },
      { key: "lin-pq", name: "林沛群 特聘教授", image: "/image/team/林沛群.jpg" },
    ],
  },
];

useSeoMeta({
  title: () => t("team.meta.title"),
  description: () => t("team.meta.description"),
});
</script>
