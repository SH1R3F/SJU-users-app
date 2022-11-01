<template>
	<div class="my-20">
		<div class="container">
			<!-- Register Volunteer Form -->
			<div class="form">
				<h5 class="text-sju-50 mb-5 border-b border-b-sju-400 pt-0 px-1 pb-2 inline-block">تسجيل مشترك جديد</h5>
				``
				<form action="https://sju.org.sa/volunteers/login" method="post">
					<!-- Name fields -->
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<div class="mb-3">
							<label for="fname">الاسم الأول</label>
							<input type="text" name="fname" id="fname" placeholder="الاسم الأول" required />
						</div>
						<div class="mb-3">
							<label for="sname">اسم الأب</label>
							<input type="text" name="sname" id="sname" placeholder="اسم الأب" required />
						</div>
						<div class="mb-3">
							<label for="tname">اسم الجد</label>
							<input type="text" name="tname" id="tname" placeholder="اسم الجد" required />
						</div>
						<div class="mb-3">
							<label for="lname">اسم العائلة</label>
							<input type="text" name="lname" id="lname" placeholder="اسم العائلة" required />
						</div>
					</div>
					<!-- Name fields -->

					<!-- Gender -->
					<div class="mb-3">
						<label>الجنس</label>
						<div class="px-2">
							<label for="male" class="mx-3">
								<input type="radio" name="gender" id="male" class="mx-1" />
								ذكر
							</label>
							<label for="female" class="mx-3">
								<input type="radio" name="gender" id="female" class="mx-1" />
								أنثى
							</label>
						</div>
					</div>
					<!-- Gender -->

					<div class="row-of-two">
						<!-- Address -->
						<div class="mb-3">
							<label for="address">مكان الإقامة</label>
							<select name="address" id="address">
								<option value="1">موزمبيق</option>
								<option value="2">الغردقة</option>
							</select>
						</div>
						<!-- Address -->

						<!-- Nationality -->
						<div class="mb-3">
							<label for="nationality">الجنسية</label>
							<select name="nationality" id="nationality">
								<option value="1">موزمبيق</option>
								<option value="2">الغردقة</option>
							</select>
						</div>
						<!-- Nationality -->
					</div>

					<div class="row-of-two">
						<!-- Qualification -->
						<div class="mb-3">
							<label for="qualification">آخر مؤهل دراسي</label>
							<select name="qualification" id="qualification">
								<option value="1">موزمبيق</option>
								<option value="2">الغردقة</option>
							</select>
						</div>
						<!-- Qualification -->

						<!-- HowKnew -->
						<div class="mb-3">
							<label for="HowKnew">كيف تعرفت على الهيئة</label>
							<select name="HowKnew" id="HowKnew">
								<option value="1">موزمبيق</option>
								<option value="2">الغردقة</option>
							</select>
						</div>
						<!-- HowKnew -->
					</div>

					<div class="row-of-two">
						<!-- Email -->
						<div class="mb-3">
							<label for="email">البريد الإلكتروني</label>
							<input type="email" name="email" id="email" placeholder="البريد الالكتروني" required />
						</div>
						<!-- Email -->

						<!-- Mobile -->
						<div class="mb-3">
							<label for="mobile">رقم الجوال</label>
							<div class="input-group">
								<input type="number" name="mobile" id="mobile" placeholder="رقم الجوال" required />
								<span class="prepend"> 966 </span>
							</div>
						</div>
						<!-- Mobile -->
					</div>

					<div class="row-of-two">
						<!-- Password -->
						<div class="mb-3">
							<label for="password">كلمة المرور</label>
							<input type="password" name="password" id="password" placeholder="كلمة المرور" required />
						</div>
						<!-- Password -->

						<!-- Password Confirmation -->
						<div class="mb-3">
							<label for="password_confirmation">تأكيد كلمة المرور</label>
							<input type="password" name="password_confirmation" id="password_confirmation" placeholder="كلمة المرور" required />
						</div>
						<!-- Password Confirmation -->
					</div>

					<div class="mb-7">
						<!-- To be replaced with google captcha! -->
						<label for="userPassword">رمز التحقق</label>
						<input type="password" name="password" class="form-control" id="userPassword" placeholder="رمز التحقق" autocompleted="" />
					</div>

					<div class="mb-7">
						<input type="checkbox" name="terms" id="terms" />
						<label for="terms">أتعهد بأن جميع البيانات صحيحة ، وإن كانت خلاف ذلك سيتم إيقاف الاشتراك</label>
					</div>

					<div class="text-end">
						<button type="submit" class="btn-primary">تسجيل</button>
					</div>
				</form>
			</div>
			<!-- Register Volunteer Form -->
		</div>
	</div>
</template>
