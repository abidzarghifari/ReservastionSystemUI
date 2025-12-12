import UpdateProfileForm from "./updateProfileform";
import UpdatePasswordForm from "./updatePasswordform";
import DeleteAccountForm from "./deleteAccountform";

export default function Page(){
	return (
		<>					  
							<div className="pb-12">
								<div className="lg:max-w-7xl mx-auto space-y-6">
									<h2 className="pt-5 text-2xl">Your <br /> <strong>Profile</strong></h2>
									<div className="p-4 sm:p-8 rounded-xl border">
										<div className="max-w-xl">
											<header className="mb-5">
												<h2 className="text-lg font-medium text-white"> 
													Profile Information
												</h2>
												<p className="mt-1 text-sm text-white">
													Update your account's profile information and email address
												</p>
											</header>
											<UpdateProfileForm/>	
										</div>
									</div>

									<div className="p-4 sm:p-8 rounded-xl border">
										<div className="max-w-xl">
											<header className="mb-5">
												<h2 className="text-lg font-medium text-white"> 
													Update Password 
												</h2>
												<p className="mt-1 text-sm text-white">
													You can update your password here!
												</p>
											</header>
											<UpdatePasswordForm/>	
										</div>
									</div>

									<div className="p-4 sm:p-8 rounded-xl border">
										<div className="max-w-xl">
											<header className="mb-5">
												<h2 className="text-lg font-medium text-white"> 
													Delete Account
												</h2>
												<p className="mt-1 text-sm text-white">
													You can delete your account, all the information about your account will be delete permanently!
												</p>
											</header>
											<DeleteAccountForm/>	
										</div>
									</div>
								</div>
								<div className="flex justify-center mt-15">
										<span className="text-sm sm:text-center dark:text-rose-400">© 2025 <a href="https://flowbite.com/" className="hover:underline">Dikayoda</a>. All Rights Reserved.
										</span>
								</div>
							</div>							
		</>
	);
}