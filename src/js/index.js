// step1 요구사항 구현을 위한 전략
//Todo 메뉴 추가

// o 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// o 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// o총 메뉴 갯수를 count하여 상단에 보여준다.
// o메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// o사용자 입력값이 빈 값이라면 추가되지 않는다.

//TODO 메뉴 수정
// 메뉴의 수정 버튼 클릭 시 이벤트를 받고, 메뉴를 수정하는 prompt 창이 뜬다.
// 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

//Todo 메뉴 삭제

//메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// 확인 버튼을 클릭하면 메뉴가 삭제된다.

const $ = (selector) => {
  return document.querySelector(selector);
};
// dom에 접근할 때 document.querySelector를 계속 쓰는 걸 $로 간단하게 재사용 해주는 코드

function App() {
  //총 개수를 count 해주는 함수
  const UpdateMenuCount = () => {
    const menuCount = document
      .querySelector("#espresso-menu-list")
      .querySelectorAll("li").length;
    // querySelector 안에 querySelectorAll를 사용해서 #espresso-menu-list안에 있는 li tag만을 가져올 수 있음
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  //이벤트 위임
  // 현재 html에 없고 자스로 추가한 코드에 대해서 상위 태그에 이벤트를 줘서 이벤트를 위임시키는 방법
  $("#espresso-menu-list").addEventListener("click", (e) => {
    //수정하는 코드
    if (e.target.classList.contains("menu-edit-button")) {
      const $menuname = e.target.previousElementSibling;

      //형제 요소 가져오는 방법
      // const menuName = e.target
      //   .closest("span")
      //   .closest("li")
      //   .querySelector(".menu-name").innerText;
      //강사님이 span 태그 가져온 방법 (closest로 li태그 가져와서 다시 그 밑 요소 가져옴)
      const updatedMenumname = prompt(
        "메뉴명을 수정하세요",
        $menuname.innerText
      );
      if (!updatedMenumname === "") {
        $menuname.innerText = updatedMenumname;
      } else {
        alert("빈 값으로 수정은 불가능합니다");
        //만약에 바로 prompt로 넘어가서 또 빈값이면 어떻게 해야하나?
      }
    }
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말 삭제하시겠습니깡?")) {
        console.log(e.target.parentElement);
        e.target.parentElement.remove();
        UpdateMenuCount();
        // location.reload();
      }
    }
  });
  //form 태그가 자동전송되는걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    menuAdd();
  });
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
      // Enter키가 아닌 다른키를 눌렀을 때 실행되지 않도록 하는 코드
    }
    if (e.key === "Enter") {
      menuAdd();
    }
  });
  const menuAdd = () => {
    if ($("#espresso-menu-name").value == "") {
      alert("값을 입력해주세용");
      return;
      //여기서 리턴을 해주면 함수 실행이 멈춰서 더이상 밑줄 코드가 실행되지 않는다.
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplete = (espressoMenuName) => {
      //단순히 어떤 동작을 실행하는 것이 아니라 무엇인가를 반환해주는 함수에는 return을 해줘야 반환가능하다.
      return `
       <li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button new-btn"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button new-btn"
  >
    삭제
  </button>
</li>`;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplete(espressoMenuName)
    );

    // el.insertAdjacentHTML("beforebegin", "<span>A-</span>");
    // // 타켓 요소 전(형제레벨)에 생성- 시작 태그의 앞(형제 레벨로) //타켓 돔 밖에서 바로 위에 생성

    // el.insertAdjacentHTML("afterbegin", "<span>B-</span>");
    // // 타켓 요소 다음(자식요소)에 생성 - 시작 태그의 뒤(자식 요소로) //타켓 돔 안에서 첫번쨰쨰

    // el.insertAdjacentHTML("beforeend", "<span>-D</span>");
    // // 타켓 요소 '끝나는 태그' 바로 직전(자식요소로)에 요소를 생성 - '종료 태그' 앞(자식 요소로) 즉 타켓 돔 안에서 마지막째

    // el.insertAdjacentHTML("afterend", "<span>-E</span>");
    // // 타켓 요소의 '끝나는 태그' 바로 다음(형제레벨)에 요소를 생성 - '종료 태그' 뒤(형제 레벨로) 즉 타켓 돔 밖에서 바로 뒤에

    $("#espresso-menu-name").value = null; //Input값 초기화
    //const 변수 = li 갯수를 카운팅해서 가져옴
    UpdateMenuCount();
  };
}

App();

// 공부해야할 것

//
