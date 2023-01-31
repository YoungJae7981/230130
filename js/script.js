//input에 focus가 in 됐을 때 그것의 부모 .inputbox에게 .inputboxact클래스를 준다. (border)

$("input").focusin(function(){
	$(this).parent('.inputbox').addClass('inputboxact');
})
$("input").focusout(function(){
	//inputboxact 클래스를 remove
	$(this).parent('.inputbox').removeClass('inputboxact');
})

let idveri, pwveri, pwchkveri, nameveri,birthveri,genderveri,phoneveri,addressveri =false;
let mailveri = true;



//아이디 박스

//#userid input에서 focusout 됐을때 그것의 글자수가 0이라면 (조건)
$("#userid input").focusout(function(){
	let len = $(this).val().length;
	if(len == 0){
		$("#userid .warn").html('<span class="text-red">필수 정보입니다.</span>')
	} else if(len <5 || len >20){
		$("#userid .warn").html('<span class="text-red">5~20자의 영어만 가능합니다</span>');
	} else {
		$("#userid .warn").html('<span class="text-green">멋진아이디</span>');
	}
})
//비밀번호 
$("#userpw input").focusout(function(){
	let len =$(this).val().length;
	pwveri = false;
	if(len == 0){
		$("#userpw .warn").html('<span class="text-red">필수 정보입니다.</span>');
		
		$("#userpw .inputbox img").attr("src","images/m_icon_pw_step_01.png");
		$("#userpw .inputbox p").attr("src","images/m_icon_pw_step_01.png");
	} else if(len < 8 || len >16){
		$("#userpw .warn").html('<span class="text-red">8~16자 영문 대 소문자,숫자,특수문자를 사용하세요.</span>');
		$("#userpw .inputbox p").html('<span class="text-red">사용불가</span>');
		$("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_10.png");
	} else{
		pwveri = true;
		//userpw .warn안에 내용을 비운다 
		//userpw .inputbox p 한테 안전이라고 글씨를 바꿔줘야함
		//userpw .inputbox img src 경로 ----->

		
		$("#userpw .warn").empty();
		$("#userpw .inputbox p").html('<span class="text-green">안전</span>');
		$("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_04.png");
	}
	})

	//비밀번호 재확인
	// "#userpw-chk input"에서 focusout 됐을떄 value값의 length가 0이라면(조건1)
	// "#userpw-chk input" warn에 빨간 글씨로 "필수정보입니다."
	$("#userpw-chk input").focusout(function(){
		let userpwchk =$(this).val();
		pwchkveri = false;
		if(userpwchk.length ==0){
			$("#userpw-chk .warn").html('<span class="text-red">필수 정보입니다.</span>');
			$("userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_02.png")
		} else if(userpwchk ==$("#userpw input").val()){
			pwchkveri = true;
			$("#userpw-chk .warn").empty();
			$("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_07.png");
			$("#userpw-chk .warn").html('<span class="text-green">동일한 비밀번호입니다.</span>');
		}
	})
	//이름
	//#user name input에서 focusout될 때

	$("#username input").focusout(function(){
		let username = $("#username input").val();
		nameveri = false;
		// JS 정규 표현식 입력값을 체크
		// 형식: /정규식/
		// 문자와 숫자가 아닌것
		let reg = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g;
		if (username.length == 0){
			$("#username .warn").html('<span class="text-red">필수 정보다.</span>');
		} else if(reg.test(username)){
			//정규식을 만족하면 true 만족하지 않으면 false 반환
			$("#username .warn").html('<span class="text-red">한글과 영문 대 소문자를 사용하시오.(특수기호 사용불가)</span>');
		} else{
			nameveri = true;
			$("#username .warn").empty();
		}
	})

	// 생년월일
	// #year , #month, #date에서 focusout될때 (실행할함수)
	// #year , value length가 숫자 4가 아니라면 (조건1) (O)
	// month
	// #birth .warn 빨간 글씨로 "태어난 년도 4자리를 정확하게 입력하세요"
	
	function para(text){
		$("#birth .warn").html('<span class="text-red">'+text +' </span>');
		}

	$("#year, #month , #date").focusout(function(){
		let year =$("#year").val();
		let month =$("#month").val();
		let date =$("#date").val();

		// 현재 날짜 및 시간
		let now = new Date();
		console.log(now);
		//Date 객체의 getTime()매서드 1970년 1월 1일 00시 00분 00초 UTC(세계 표준시를 기준으로 경과한 밀리초(trnaslate(ms))를 반환함)
		let nowstamp = now.getTime();
		//현재 날짜 및 시간에서 현재 연도의 네 자리값을 변수에 할당
		now  = now.getFullYear();
		console.log(now);

		let birth = new Date(year, month , date); 
		birth =  birth.getTime(); 
		birthveri = false;
		
		if(year.length!=4){
			para("너 몇년생이야");
			
		} else if(month.length ==0){
			para("너 몇월생이야");
			// $("#birth .warn").html('<span class="text-red">태어난 월을 정확히 입력해라</span>');
		} else if(date.length ==0){
			para("너 몇일생이야");
			// $("#birth .warn").html('<span class="text-red">태어난 일을 정확히 입력해라</span>');
		} else if(isNaN(year,month,date)){
			para("다시한번 작성해");
			// $("#birth .warn").html('<span class="text-red">생년월일을 다시한번 확인해라</span>');
		} else if(now -year >100){
			para("구라 즐");
			// $("#birth .warn").html('<span class="text-green">ㄹㅇ?</span>');
		} else if(now -year ==27 ){
			para("오 그럼 동갑이네");
			// $("#birth .warn").html('<span class="text-green">동갑인데요</span>');
		} else if(nowstamp <birth){
			para("구라 ㄴ");
			// $("#birth .warn").html('<span class="text-black">구라좀 치지마</span>');
		}else{
			birthveri = false;
			para("")
			// para("");
			// $("#birth .warn").empty();
		}
	})
		
		
		
	





		
	 

