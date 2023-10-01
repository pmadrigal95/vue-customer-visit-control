<script setup>
import { loadFull } from "tsparticles";

const props = defineProps({
 title: {
  type: String,
  default: "Fox Paw Track",
 },

 msg: {
  type: String,
  default: "Control de visitas: ¡tu aliado en el campo!",
 },

 imagen: {
  type: String,
  default: "https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/logoFox.png",
 },

 arrayColors: {
	type: Array,
	default: ["#273A71", "#CCD4E7", "#FE8800", "#FFFFFF", "#ED7501", "#07103B"],
 }
});

const particlesInit = async engine => {
	await loadFull(engine);
};

const particlesLoaded = async container => {
	console.log("Particles container loaded", container);
};

const options = {
	fpsLimit: 60,
	fullScreen: { enable: false },
	particles: {
		number: {
			value: 50
		},
		shape: {
			type: "circle"
		},
		opacity: {
			value: 0.5
		},
		size: {
			value: 400,
			random: {
				enable: true,
				minimumValue: 200
			}
		},
		move: {
			enable: true,
			speed: 3,
			direction: "top",
			outModes: {
				default: "out",
				top: "destroy",
				bottom: "none"
			}
		}
	},
	interactivity: {
		detectsOn: "canvas",
		events: {
			resize: true
		}
	},
	style: {
		filter: "blur(50px)"
	},
	detectRetina: true,
	themes: [
		{
			name: "light",
			default: {
				value: true,
				mode: "light"
			},
			options: {
				particles: {
					color: {
						value: props.arrayColors
					}
				}
			}
		},
	],
	emitters: {
		direction: "top",
		position: {
			x: 50,
			y: 150
		},
		rate: {
			delay: 0.2,
			quantity: 2
		},
		size: {
			width: 100,
			height: 0
		}
	}
};
</script>


<template>
	<section class="h-screen w-screen flex flex-row">

		<section class="h-screen basis-3/5 hidden md:block bg-yellow-100">

			<section class="z-1 absolute">
				<vue-particles id="tsparticles" class="h-screen w-full" :particlesInit="particlesInit"
					:particlesLoaded="particlesLoaded" :options="options" />
			</section>

			<section class="z-50 relative bg-gradient-to-t from-black/60">
				<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 ">
					<img class="rounded-full"
						:src="imagen"
						alt="" width="500" height="500" />
					<article class="pt-28 dark:bg-black">
						<h2 class="mx-auto text-4xl font-semibold text-white text-center dark:text-blueProgress600 ">
							{{ title }}</h2>
						<p class="text-lg text-white text-center pt-2 pb-8 dark:text-white">{{ msg }}</p>
					</article>
				</div>
			</section>
		</section>

		<section class="basis-2/5 z-50 relative bg-white">
			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div
					class="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<slot name="content"></slot>
				</div>
			</div>
		</section>
	</section>
</template>