<template>
  <section class="py-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1
          class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
        >
          計畫團隊
        </h1>
      </div>

      <!-- Principal Investigators -->
      <div class="mb-16">
        <h3
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-500 pl-4"
        >
          主持人與協同主持人
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMemberCard
            name="張嘉惠 教授"
            title="計畫主持人 | 國立中央大學資訊工程學系"
            image="/image/team/張嘉惠.jpg"
            link="https://sites.google.com/site/nculab/advisor"
          >
            <template #description>
              研究興趣包括Web資訊整合、自然語言理解、資料探勘、智慧計算等。現任國科會工程處智慧計算學門召集人。
            </template>
          </TeamMemberCard>
          <TeamMemberCard
            name="戴敏育 教授"
            title="協同主持人 | 國立臺北大學資訊管理研究所"
            image="/image/team/myday_photo.jpg"
            link="https://web.ntpu.edu.tw/~myday/"
          >
            <template #description>
              專精於人工智慧、代理式AI、永續綠色金融科技。現任國立臺北大學資訊管理研究所所長兼金融科技暨綠色金融研究中心主任。
            </template>
          </TeamMemberCard>
          <TeamMemberCard
            name="胡敏君 教授"
            title="協同主持人 | 國立清華大學資訊工程學系"
            image="/image/team/胡敏君.jpg"
            link="https://mislab.cs.nthu.edu.tw/"
          >
            <template #description>
              專精於多媒體運算、電腦視覺、電腦圖學、擴增實境與虛擬實境。
            </template>
          </TeamMemberCard>
        </div>
      </div>

      <!-- Agentic AI Consultants -->
      <div class="mb-16">
        <h3
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-500 pl-4"
        >
          Agentic AI 諮詢委員
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamMemberCard
            name="黃三益 特聘教授"
            title="國立中山大學資訊管理學系"
            image="/image/team/黃三益.jpg"
          >
            <template #description
              >專精於資料庫系統、文字探勘、資料探勘、工作流程管理。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="許秉瑜 教授"
            title="國立中央大學企業管理學系"
            image="/image/team/許秉瑜.jpg"
          >
            <template #description
              >專精於企業e化管理、資料挖礦、商業智慧與ERP系統管理。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="蔣榮先 特聘教授"
            title="國立成功大學資訊工程學系"
            image="/image/team/蔣榮先.jpeg"
          >
            <template #description
              >專精於生醫資訊探勘、人工智慧、智慧型計算、雲端醫療照護、癌症與幹細胞研究、巨量資料分析。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="劉昭麟 特聘教授"
            title="國立政治大學資訊科學系"
            image="/image/team/chaolin.jpg"
          >
            <template #description
              >研究領域包含人工智慧、機器學習、LLMs
              應用、知識探勘、法學資訊、數位人文、模型建構等。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="陳柏琳 特聘教授"
            title="國立臺灣師範大學資訊工程學系"
            image="/image/team/陳柏琳.png"
          >
            <template #description
              >專精於語音辨識、資訊檢索、自然語言處理、機器學習。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="王建彬 院長"
            title="財團法人商業發展研究所"
            image="/image/team/王建彬.jpeg"
          >
            <template #description
              >專精於科技管理、創新管理、經營模式、服務管理、服務行銷、產業分析、企業診斷與問題決策、策略創新。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="林縣城 副總經理"
            title="叡揚資訊"
            image="/image/team/林縣城.jpg"
          >
            <template #description
              >現任叡揚資訊技術服務總處暨創新研發中心副總經理。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="梁伯嵩 資深處長"
            title="聯發科技"
            image="/image/team/梁伯嵩.jpg"
          >
            <template #description
              >專精於AI運算架構與數位IC設計。
              現任聯發科技企業策略與前瞻技術資深處長，與臺大資工系、電子所、重點科技學院客座教授，與陽明交通大學電機學院客座教授。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="蔡明順 校務長"
            title="台灣人工智慧學校"
            image="/image/team/蔡明順.jpg"
          >
            <template #description
              >專精於AI人才發展戰略、數位創新治理、產業AI轉型。</template
            >
          </TeamMemberCard>
        </div>
      </div>

      <!-- Robotics AI Consultants -->
      <div>
        <h3
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-500 pl-4"
        >
          Robotics AI 諮詢委員
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamMemberCard
            name="莊家峯 講座教授"
            title="國立中興大學電機工程學系"
            image="/image/team/莊家峯.jpg"
          >
            <template #description
              >專精於計算智慧、模糊系統、類神經網路、深度學習、進化計算、智慧型機器人。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="蘇文鈺 教授"
            title="國立成功大學資訊工程學系"
            image="/image/team/蘇文鈺.jpg"
          >
            <template #description
              >專精於數位音訊處理、影像視訊處理、電腦音樂分析合成、媒體處理機設計。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="李祖聖 特聘教授"
            title="國立成功大學電機工程學系"
            image="/image/team/李祖聖.jpg"
          >
            <template #description
              >專精於人工智慧和生物智慧及其應用、人形機器人、服務機器人、模糊系統與控制。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="張禎元 講座教授"
            title="國立清華大學動力機械工程學系"
            image="/image/team/張禎元.jpg"
          >
            <template #description
              >專精於機電整合、機器人、機械振動、動力系統與控制、智慧機械和製造等領域。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="葉廷仁 特聘教授"
            title="國立清華大學動力機械工程系"
            image="/image/team/葉廷仁特聘教授.jpg"
          >
            <template #description
              >專精於動態系統建模與控制、非線性控制理論、以及機器人應用。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="曾煜棋 終身講座教授"
            title="國立陽明交通大學資訊工程學系"
            image="/image/team/曾煜棋.jpg"
          >
            <template #description
              >專精於物聯網、5G行動科技、人工智慧服務。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="吳炳飛 講座教授"
            title="國立陽明交通大學電機工程學系"
            image="/image/team/吳炳飛.jpg"
          >
            <template #description
              >專精於系統控制、多媒體訊號處理、生醫工程、人工智慧與計算機工程、AI機器人。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="楊谷洋 教授"
            title="國立陽明交通大學電機工程學系"
            image="/image/team/楊谷洋.jpg"
          >
            <template #description
              >專精於機器人學習控制、路徑規劃與校正、VR/機器人整合、生物控制系統。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="傅立成 講座教授"
            title="國立臺灣大學電機工程學系暨資訊工程學系"
            image="/image/team/傅立成.png"
          >
            <template #description
              >專精於社交機器人、智慧家庭、影像偵測和追蹤、虛擬實境、控制理論與應用。</template
            >
          </TeamMemberCard>
          <TeamMemberCard
            name="林沛群 特聘教授"
            title="國立臺灣大學機械工程學系"
            image="/image/team/林沛群.jpg"
          >
            <template #description
              >專精於機器人、仿生工程、機械系統設計、機電整合/運動控制。</template
            >
          </TeamMemberCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "計畫團隊 - 前瞻AI人培",
});
</script>
