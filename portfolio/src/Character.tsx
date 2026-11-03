import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export default function Character({motion}:{motion:boolean}) {
 const host = useRef<HTMLDivElement>(null); const moving=useRef(motion); moving.current=motion;
 const [status,setStatus]=useState('Memuat karakter 3D…');
 useEffect(()=>{
  const element=host.current!;let active=true, frame=0, visible=true;
  let renderer:THREE.WebGLRenderer;
  try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});} catch {setStatus('Mode ringan · 3D tidak tersedia');return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.toneMapping=THREE.ACESFilmicToneMapping;
  element.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(24,1,0.1,200);camera.position.set(0,12.7,23);camera.lookAt(0,10.8,0);
  scene.add(new THREE.HemisphereLight(0xf8ecff,0x40304f,2.5));const key=new THREE.DirectionalLight(0xffe8f4,3);key.position.set(5,15,8);scene.add(key);const rim=new THREE.DirectionalLight(0xba9aff,4);rim.position.set(-6,12,-4);scene.add(rim);
  const draco=new DRACOLoader();draco.setDecoderPath(import.meta.env.BASE_URL+'draco/');draco.setDecoderConfig({type:'js'});const loader=new GLTFLoader().setDRACOLoader(draco);
  const controller=new AbortController();let character:THREE.Group|undefined,mixer:THREE.AnimationMixer|undefined;let neck:THREE.Object3D|undefined;let mouseX=0,mouseY=0;
  const dispose=(object:THREE.Object3D)=>object.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>{Object.values(m).forEach(v=>{if(v instanceof THREE.Texture)v.dispose();});m.dispose();});}});
  const timeout=window.setTimeout(()=>{if(active)setStatus('3D masih dimuat · portofolio tetap dapat digunakan');},15000);
  async function load(){
   try{
    const response=await fetch(import.meta.env.BASE_URL+'models/character.glb',{signal:controller.signal});if(!response.ok)throw Error('Asset unavailable');
    const buffer=await response.arrayBuffer();
    const gltf=await loader.parseAsync(buffer,'');if(!active){dispose(gltf.scene);return;}
    character=gltf.scene;scene.add(character);character.rotation.y=-0.13;
    character.traverse(o=>{if(o instanceof THREE.Mesh){o.frustumCulled=false;if(o.name==='Plane004'||o.name==='screenlight')o.visible=false;}});
    const monitor=character.getObjectByName('Plane004');if(monitor)monitor.visible=false;
    const screen=character.getObjectByName('screenlight');if(screen)screen.visible=false;
    mixer=new THREE.AnimationMixer(character);
    const intro=gltf.animations.find(c=>c.name==='introAnimation');if(intro){const action=mixer.clipAction(intro);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();mixer.update(intro.duration);}
    const blink=gltf.animations.find(c=>c.name==='Blink');if(blink)mixer.clipAction(blink).play();
    neck=character.getObjectByName('spine006');window.clearTimeout(timeout);setStatus('');element.classList.add('ready');
   }catch(e){if(active){window.clearTimeout(timeout);setStatus('Mode ringan · karakter 3D tidak tersedia');console.warn('3D model could not load',e);}}
  }
  new RGBELoader().load(import.meta.env.BASE_URL+'models/char_enviorment.hdr',texture=>{if(!active){texture.dispose();return;}texture.mapping=THREE.EquirectangularReflectionMapping;scene.environment=texture;scene.environmentIntensity=0.7;},undefined,()=>{});
  void load();
  const resize=()=>{const r=element.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(element);resize();
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});intersection.observe(element);
  const pointer=(e:PointerEvent)=>{const r=element.getBoundingClientRect();mouseX=((e.clientX-r.left)/r.width-0.5)*0.35;mouseY=((e.clientY-r.top)/r.height-0.5)*0.16;};window.addEventListener('pointermove',pointer);
  const clock=new THREE.Clock();const render=()=>{frame=requestAnimationFrame(render);const delta=Math.min(clock.getDelta(),0.05);if(!visible||document.hidden)return;if(moving.current){mixer?.update(delta);if(neck){neck.rotation.y=THREE.MathUtils.lerp(neck.rotation.y,mouseX,0.04);neck.rotation.x=THREE.MathUtils.lerp(neck.rotation.x,mouseY,0.04);}}renderer.render(scene,camera);};render();
  return()=>{active=false;controller.abort();window.clearTimeout(timeout);cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',pointer);mixer?.stopAllAction();dispose(scene);scene.environment?.dispose();draco.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div className="character" ref={host} role="img" aria-label="Karakter 3D interaktif dari template portofolio">{status&&<span className="scene-status" role="status">{status}</span>}</div>;
}
