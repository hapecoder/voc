<script>
// here to edit path
const linkHeader = "C:\\Program Files (x86)\\Nero\\";
const neroVersion = "Nero Platinum Suite";
const softwareLink = new Map([
    ["Nero Start", linkHeader + "\\Nero Common\\Nero Launcher\\NeroLauncher"],
    ["Nero MediaHome", linkHeader + neroVersion + "\\Nero MediaHome\\MediaHome"],
    ["Nero Video", linkHeader + neroVersion + "\\Nero Vision\\NeroVisions"],
    [
        "Nero RescueAgent",
        linkHeader + neroVersion + "\\Nero RescueAgent\\NeroRescueAgent"
    ],
    ["Nero DuplicateManager", linkHeader + neroVersion + "\\Nero NDM\\Duplicate"],
    ["Nero BackItUp", linkHeader + neroVersion + "\\Nero BackItUp\\BackItUp"],
    [
        "Nero Recode",
        linkHeader + neroVersion + "\\Nero Recode\\Nero Recode\\Recode"
    ],
    ["NeroAITag", linkHeader + neroVersion + "\\NeroAITag\\NeroAITag"],
    ["Nero Burning ROM", linkHeader + neroVersion + "\\Nero Burning ROM\\nero"],
    [
        "Nero RescueAgent",
        linkHeader + neroVersion + "\\Nero RescueAgent\\NeroRescueAgent"
    ],
    [
        "Nero CoverDesigner",
        linkHeader + "Nero Apps\\Nero CoverDesigner\\CoverDes"
    ],
    ["Nero TuneItUp", linkHeader + "Nero TuneItUp\\TuneItUp.exe"]
]);
export default {
    softwareLink,

};
</script>
