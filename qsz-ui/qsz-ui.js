import { defineComponent as h, ref as m, createVNode as t, Fragment as y, withDirectives as v, vShow as g, createTextVNode as z, computed as k } from "vue";
const L = /* @__PURE__ */ h({
  name: "ShInput",
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(s, r) {
    let i = r.slots, c = r.emit;
    const e = m(s.modelValue), a = (n) => {
      const p = n.target;
      e.value = p.value, c("update:modelValue", e.value);
    };
    return () => {
      var n, p;
      return t(y, null, [t("div", {
        class: "sh-input-box"
      }, [v(t("div", {
        class: "prepend"
      }, [(n = i.prepend) == null ? void 0 : n.call(i)]), [[g, i.prepend]]), t("input", {
        disabled: s.disabled,
        value: e.value,
        onInput: a,
        class: {
          "pre-radius": i.prepend,
          "suf-radius": i.append
        },
        type: "text",
        placeholder: "请输入"
      }, null), v(t("div", {
        class: "append"
      }, [(p = i.append) == null ? void 0 : p.call(i)]), [[g, i.append]])])]);
    };
  }
}), E = /* @__PURE__ */ h({
  name: "ShSelect",
  props: {
    disable: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  setup(s, r) {
    const i = m(s.placeholder), c = {
      name: "",
      value: ""
    }, e = m(!0), a = m(!1), n = m(!1), p = m(!1);
    document.addEventListener("DOMContentLoaded", (o) => {
      document.addEventListener("click", function() {
        n.value = !1, p.value = !1, e.value = !0, a.value = !1;
      });
      const l = document.getElementsByClassName("sh-select")[0];
      l.addEventListener("mouseover", function() {
        u(c) && (a.value = !0, e.value = !0);
      }), l.addEventListener("mouseleave", function() {
        u(c) && (a.value = !1, n.value ? e.value = !1 : e.value = !0);
      });
    });
    function w(o) {
      o.stopPropagation(), u(c) && a.value && (a.value = !1), n.value = !n.value, p.value = !p.value, e.value = !e.value, S();
    }
    function x(o) {
      o.stopPropagation();
      const l = o.target;
      let d = l.textContent, f = l.getAttribute("data-value");
      c.name = d, c.value = f, i.value = d, p.value = !1, n.value = !1, e.value = !0, a.value = !1;
    }
    function S() {
      if (u(c)) {
        const d = document.getElementsByClassName("option-box-ul")[0].getElementsByTagName("li");
        for (let f of d) {
          const b = f;
          c.name == f.textContent ? b.classList.add("selected") : b.classList.remove("selected");
        }
      } else
        return;
    }
    function B(o) {
      o.stopPropagation(), c.name = "", c.value = "", i.value = s.placeholder, a.value = !1;
    }
    function u(o) {
      for (let l in o)
        if (o.hasOwnProperty(l) && o[l] != null && o[l] != "")
          return !0;
      return !1;
    }
    return () => t(y, null, [t("div", {
      class: ["sh-select-box", s.disable ? "sh-select-box-disabled" : ""],
      onClick: w
    }, [t("div", {
      class: ["sh-select", n.value ? "focus-style" : "no-focus-style"]
    }, [t("span", {
      class: "placeholder"
    }, [i.value]), t("div", {
      class: "icon"
    }, [v(t("span", {
      class: "icon-item"
    }, [t("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16",
      width: "16",
      height: "16"
    }, [t("path", {
      d: "M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
    }, null)])]), [[g, e.value && !a.value]]), v(t("span", {
      class: "icon-item"
    }, [t("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16",
      width: "16",
      height: "16"
    }, [t("path", {
      d: "M3.22 10.53a.749.749 0 0 1 0-1.06l4.25-4.25a.749.749 0 0 1 1.06 0l4.25 4.25a.749.749 0 1 1-1.06 1.06L8 6.811 4.28 10.53a.749.749 0 0 1-1.06 0Z"
    }, null)])]), [[g, !e.value && !a.value]]), v(t("span", {
      class: "icon-item",
      onClick: B
    }, [t("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16",
      width: "16",
      height: "16"
    }, [t("path", {
      d: "M2.344 2.343h-.001a8 8 0 0 1 11.314 11.314A8.002 8.002 0 0 1 .234 10.089a8 8 0 0 1 2.11-7.746Zm1.06 10.253a6.5 6.5 0 1 0 9.108-9.275 6.5 6.5 0 0 0-9.108 9.275ZM6.03 4.97 8 6.94l1.97-1.97a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l1.97 1.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-1.97 1.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L6.94 8 4.97 6.03a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018Z"
    }, null)])]), [[g, a.value]])])]), t("div", {
      class: ["sh-select-option-box", p.value ? "show-option-box" : "hidden-option-box", n.value ? "focus-style" : "no-focus-style"]
    }, [t("ul", {
      class: "option-box-ul"
    }, [s.options.map((o) => t("li", {
      class: "option-item",
      "data-value": o.value,
      onClick: x
    }, [o.name]))])])])]);
  }
}), q = /* @__PURE__ */ h({
  name: "ShButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    icon: {
      type: String,
      default: ""
    },
    circle: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "middle"
    },
    text: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: ""
    }
  },
  setup(s, r) {
    const i = r.slots;
    return () => t("button", {
      class: ["sh-button", s.size, s.type, s.round ? "is-round" : "", s.circle ? "is-circle" : ""]
    }, [i.default ? i.default() : t("span", null, [z("按钮")])]);
  }
}), I = /* @__PURE__ */ h({
  name: "ShIcon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: 30
    },
    color: {
      type: String,
      default: "#ffffff"
    }
  },
  setup(s, r) {
    const i = k(() => "#icon-" + s.icon), c = k(() => s.size.toString().includes("px") ? s.size.toString() : s.size.toString() + "px");
    return () => t("svg", {
      class: "sh-icon",
      "aria-hidden": "true",
      style: {
        width: c.value,
        height: c.value
      }
    }, [t("use", {
      "xlink:href": i.value,
      fill: s.color
    }, null)]);
  }
}), C = (s) => Object.values(s), V = /* @__PURE__ */ Object.assign({ "../static/icons/alert-24.svg": () => import("./alert-24-C7Ycw0M9.js"), "../static/icons/alert-fill-24.svg": () => import("./alert-fill-24-BH5llIRD.js"), "../static/icons/archive-24.svg": () => import("./archive-24-vX7F6Y1B.js"), "../static/icons/arrow-both-24.svg": () => import("./arrow-both-24-BEyGRPjg.js"), "../static/icons/arrow-down-24.svg": () => import("./arrow-down-24-xAm4zOfJ.js"), "../static/icons/arrow-down-left-24.svg": () => import("./arrow-down-left-24-DyM521bb.js"), "../static/icons/arrow-down-right-24.svg": () => import("./arrow-down-right-24-B68ovtPH.js"), "../static/icons/arrow-left-24.svg": () => import("./arrow-left-24-5-hUI90h.js"), "../static/icons/arrow-right-24.svg": () => import("./arrow-right-24-Cb00eP-u.js"), "../static/icons/arrow-switch-24.svg": () => import("./arrow-switch-24-CqOsVxXD.js"), "../static/icons/arrow-up-24.svg": () => import("./arrow-up-24-D6fI9m25.js"), "../static/icons/arrow-up-left-24.svg": () => import("./arrow-up-left-24-mLqO_egf.js"), "../static/icons/arrow-up-right-24.svg": () => import("./arrow-up-right-24-CbDB4pNb.js"), "../static/icons/beaker-24.svg": () => import("./beaker-24-B_4whmZ4.js"), "../static/icons/bell-24.svg": () => import("./bell-24-2dIcmvAN.js"), "../static/icons/bell-fill-24.svg": () => import("./bell-fill-24-Dpa_A3A5.js"), "../static/icons/bell-slash-24.svg": () => import("./bell-slash-24-v_3yyRK3.js"), "../static/icons/blocked-24.svg": () => import("./blocked-24-DV-wXSyM.js"), "../static/icons/bold-24.svg": () => import("./bold-24-GlhYwrLJ.js"), "../static/icons/book-24.svg": () => import("./book-24-CMwHfYi0.js"), "../static/icons/bookmark-24.svg": () => import("./bookmark-24-ClAea7tZ.js"), "../static/icons/bookmark-fill-24.svg": () => import("./bookmark-fill-24-DbD-Ohjg.js"), "../static/icons/bookmark-slash-24.svg": () => import("./bookmark-slash-24-MGNbreSE.js"), "../static/icons/bookmark-slash-fill-24.svg": () => import("./bookmark-slash-fill-24-WN-iRebV.js"), "../static/icons/briefcase-24.svg": () => import("./briefcase-24-DTFp-enD.js"), "../static/icons/broadcast-24.svg": () => import("./broadcast-24-C7cy2KE5.js"), "../static/icons/browser-24.svg": () => import("./browser-24-DmEkKSVk.js"), "../static/icons/bug-24.svg": () => import("./bug-24-sqyySkG-.js"), "../static/icons/calendar-24.svg": () => import("./calendar-24-BWjziGe4.js"), "../static/icons/check-24.svg": () => import("./check-24-BjfcxQM4.js"), "../static/icons/check-circle-24.svg": () => import("./check-circle-24-BE2_t1Sy.js"), "../static/icons/check-circle-fill-24.svg": () => import("./check-circle-fill-24-ZpFMZB0E.js"), "../static/icons/checkbox-24.svg": () => import("./checkbox-24-DMUeuPup.js"), "../static/icons/checklist-24.svg": () => import("./checklist-24-BP4a4jlt.js"), "../static/icons/chevron-down-24.svg": () => import("./chevron-down-24-pRrooRrx.js"), "../static/icons/chevron-left-24.svg": () => import("./chevron-left-24-DiX3QHfk.js"), "../static/icons/chevron-right-24.svg": () => import("./chevron-right-24-B8yu4HDL.js"), "../static/icons/chevron-up-24.svg": () => import("./chevron-up-24-BpOnvJT1.js"), "../static/icons/circle-24.svg": () => import("./circle-24-BUxqAlYE.js"), "../static/icons/circle-slash-24.svg": () => import("./circle-slash-24-Bv1FEXRy.js"), "../static/icons/clock-24.svg": () => import("./clock-24-C_ODhORE.js"), "../static/icons/clock-fill-24.svg": () => import("./clock-fill-24-CloT4onR.js"), "../static/icons/cloud-24.svg": () => import("./cloud-24-rKfTnaX9.js"), "../static/icons/cloud-offline-24.svg": () => import("./cloud-offline-24-Boey9qKG.js"), "../static/icons/code-24.svg": () => import("./code-24-Dx7K0cTh.js"), "../static/icons/code-of-conduct-24.svg": () => import("./code-of-conduct-24-EsZs-7n6.js"), "../static/icons/code-review-24.svg": () => import("./code-review-24-BJ2MOEnz.js"), "../static/icons/code-square-24.svg": () => import("./code-square-24-CHbGBoPy.js"), "../static/icons/codescan-24.svg": () => import("./codescan-24-_tyLaeLm.js"), "../static/icons/codescan-checkmark-24.svg": () => import("./codescan-checkmark-24--Ir9j8G_.js"), "../static/icons/codespaces-24.svg": () => import("./codespaces-24-Wy9cOCqa.js"), "../static/icons/columns-24.svg": () => import("./columns-24-BGYuThP0.js"), "../static/icons/command-palette-24.svg": () => import("./command-palette-24-BDKixggJ.js"), "../static/icons/comment-24.svg": () => import("./comment-24-qDWxe4Lp.js"), "../static/icons/comment-discussion-24.svg": () => import("./comment-discussion-24-Drpygnkf.js"), "../static/icons/commit-24.svg": () => import("./commit-24-azWLp1OA.js"), "../static/icons/container-24.svg": () => import("./container-24-DonRWsnt.js"), "../static/icons/copilot-24.svg": () => import("./copilot-24-xtqoEXKJ.js"), "../static/icons/copy-24.svg": () => import("./copy-24-gxJdi2g7.js"), "../static/icons/cpu-24.svg": () => import("./cpu-24-CRBmXR40.js"), "../static/icons/credit-card-24.svg": () => import("./credit-card-24-BRGkDtHn.js"), "../static/icons/cross-reference-24.svg": () => import("./cross-reference-24-BoScTPaP.js"), "../static/icons/dash-24.svg": () => import("./dash-24-BfMxtrBB.js"), "../static/icons/database-24.svg": () => import("./database-24-B4ZmJqgf.js"), "../static/icons/dependabot-24.svg": () => import("./dependabot-24-_MZRhmd6.js"), "../static/icons/desktop-download-24.svg": () => import("./desktop-download-24-CEo53Ye-.js"), "../static/icons/device-camera-video-24.svg": () => import("./device-camera-video-24-Dct1H_2r.js"), "../static/icons/device-desktop-24.svg": () => import("./device-desktop-24-Dei3r9tB.js"), "../static/icons/device-mobile-24.svg": () => import("./device-mobile-24-DmKuTIq2.js"), "../static/icons/devices-24.svg": () => import("./devices-24-2ggtHdOK.js"), "../static/icons/diamond-24.svg": () => import("./diamond-24-By1WiSOj.js"), "../static/icons/diff-24.svg": () => import("./diff-24-BKg_T1vr.js"), "../static/icons/discussion-closed-24.svg": () => import("./discussion-closed-24-DGrurvHp.js"), "../static/icons/discussion-duplicate-24.svg": () => import("./discussion-duplicate-24-oyz0rmZe.js"), "../static/icons/discussion-outdated-24.svg": () => import("./discussion-outdated-24-DBDP-d5b.js"), "../static/icons/dot-24.svg": () => import("./dot-24-Dci3OsQK.js"), "../static/icons/dot-fill-24.svg": () => import("./dot-fill-24-BKhZbmIb.js"), "../static/icons/download-24.svg": () => import("./download-24-Dnadcbms.js"), "../static/icons/duplicate-24.svg": () => import("./duplicate-24-ZCPJvh1U.js"), "../static/icons/eye-24.svg": () => import("./eye-24-d5B6lWSj.js"), "../static/icons/eye-closed-24.svg": () => import("./eye-closed-24-81dK2PCs.js"), "../static/icons/file-24.svg": () => import("./file-24-B_GM5Cax.js"), "../static/icons/file-binary-24.svg": () => import("./file-binary-24-hESY2s05.js"), "../static/icons/file-code-24.svg": () => import("./file-code-24-Bs92PRiZ.js"), "../static/icons/file-diff-24.svg": () => import("./file-diff-24-VHxynF1x.js"), "../static/icons/file-directory-24.svg": () => import("./file-directory-24-DBXwwXAk.js"), "../static/icons/file-directory-fill-24.svg": () => import("./file-directory-fill-24-EMMXn6mZ.js"), "../static/icons/file-directory-symlink-24.svg": () => import("./file-directory-symlink-24-CTSEpRTi.js"), "../static/icons/file-media-24.svg": () => import("./file-media-24-CVDdd7nx.js"), "../static/icons/file-submodule-24.svg": () => import("./file-submodule-24-BQzuimve.js"), "../static/icons/file-symlink-file-24.svg": () => import("./file-symlink-file-24-B3Bpk_HN.js"), "../static/icons/file-zip-24.svg": () => import("./file-zip-24-DT3Ge6Ym.js"), "../static/icons/filter-24.svg": () => import("./filter-24-BOF9lxiQ.js"), "../static/icons/filter-remove-24.svg": () => import("./filter-remove-24-OY2oydoH.js"), "../static/icons/flame-24.svg": () => import("./flame-24-BhSZaVBZ.js"), "../static/icons/fold-24.svg": () => import("./fold-24-C-HJkx7g.js"), "../static/icons/fold-down-24.svg": () => import("./fold-down-24-C6Lv7zdg.js"), "../static/icons/fold-up-24.svg": () => import("./fold-up-24-BBQPBLln.js"), "../static/icons/gear-24.svg": () => import("./gear-24-fub3-cRd.js"), "../static/icons/gift-24.svg": () => import("./gift-24-0tuageui.js"), "../static/icons/git-branch-24.svg": () => import("./git-branch-24-DJwwt7hz.js"), "../static/icons/git-commit-24.svg": () => import("./git-commit-24-wQqIn_6D.js"), "../static/icons/git-compare-24.svg": () => import("./git-compare-24-CS4vVElp.js"), "../static/icons/git-merge-24.svg": () => import("./git-merge-24-CRqrVwYm.js"), "../static/icons/git-merge-queue-24.svg": () => import("./git-merge-queue-24-BFjsV_T6.js"), "../static/icons/git-pull-request-24.svg": () => import("./git-pull-request-24-H-XN4okB.js"), "../static/icons/git-pull-request-closed-24.svg": () => import("./git-pull-request-closed-24-lSoKkFy4.js"), "../static/icons/git-pull-request-draft-24.svg": () => import("./git-pull-request-draft-24-hN4XaeLd.js"), "../static/icons/globe-24.svg": () => import("./globe-24-DYWPiiIb.js"), "../static/icons/goal-24.svg": () => import("./goal-24-B--xXkRq.js"), "../static/icons/grabber-24.svg": () => import("./grabber-24-DttxDUEw.js"), "../static/icons/graph-24.svg": () => import("./graph-24-CVAVdixV.js"), "../static/icons/hash-24.svg": () => import("./hash-24-DwEV6quJ.js"), "../static/icons/heading-24.svg": () => import("./heading-24-BABDCEnE.js"), "../static/icons/heart-24.svg": () => import("./heart-24-DV60qCP6.js"), "../static/icons/heart-fill-24.svg": () => import("./heart-fill-24-C7zH_JaQ.js"), "../static/icons/history-24.svg": () => import("./history-24-CquxNr6b.js"), "../static/icons/home-24.svg": () => import("./home-24-DhXEDxyN.js"), "../static/icons/home-fill-24.svg": () => import("./home-fill-24-D362uxS4.js"), "../static/icons/horizontal-rule-24.svg": () => import("./horizontal-rule-24-D0pxsVWn.js"), "../static/icons/hourglass-24.svg": () => import("./hourglass-24-D2PXA8qT.js"), "../static/icons/hubot-24.svg": () => import("./hubot-24-9Z-EneQ4.js"), "../static/icons/image-24.svg": () => import("./image-24-YDe8yUxB.js"), "../static/icons/inbox-24.svg": () => import("./inbox-24-Brf8P23c.js"), "../static/icons/infinity-24.svg": () => import("./infinity-24-_u_dWMBp.js"), "../static/icons/info-24.svg": () => import("./info-24-Bm_dQZjS.js"), "../static/icons/issue-closed-24.svg": () => import("./issue-closed-24-BE2_t1Sy.js"), "../static/icons/issue-draft-24.svg": () => import("./issue-draft-24-BBxoDlcL.js"), "../static/icons/issue-opened-24.svg": () => import("./issue-opened-24-CDqJcW38.js"), "../static/icons/issue-reopened-24.svg": () => import("./issue-reopened-24-CBV-ZAPI.js"), "../static/icons/issue-tracked-by-24.svg": () => import("./issue-tracked-by-24-Cu5nBvAS.js"), "../static/icons/issue-tracks-24.svg": () => import("./issue-tracks-24-Ceel7IWg.js"), "../static/icons/italic-24.svg": () => import("./italic-24-DhnJr6hL.js"), "../static/icons/iterations-24.svg": () => import("./iterations-24-CvJ1j-AO.js"), "../static/icons/kebab-horizontal-24.svg": () => import("./kebab-horizontal-24-i4XZV60X.js"), "../static/icons/key-24.svg": () => import("./key-24-CL7cVOZ_.js"), "../static/icons/law-24.svg": () => import("./law-24-CclJ7trG.js"), "../static/icons/light-bulb-24.svg": () => import("./light-bulb-24-DPxRQhYL.js"), "../static/icons/link-24.svg": () => import("./link-24-Bsw_xJG4.js"), "../static/icons/link-external-24.svg": () => import("./link-external-24-BHHLfNFU.js"), "../static/icons/list-ordered-24.svg": () => import("./list-ordered-24-D77LCfu7.js"), "../static/icons/list-unordered-24.svg": () => import("./list-unordered-24-ClSCRZr3.js"), "../static/icons/location-24.svg": () => import("./location-24-BsDpLEZM.js"), "../static/icons/lock-24.svg": () => import("./lock-24-c36vaaWR.js"), "../static/icons/log-24.svg": () => import("./log-24-C0iMkZtx.js"), "../static/icons/mail-24.svg": () => import("./mail-24-C_HokGzs.js"), "../static/icons/megaphone-24.svg": () => import("./megaphone-24-BvB1pPh2.js"), "../static/icons/mention-24.svg": () => import("./mention-24-b3lORhUp.js"), "../static/icons/milestone-24.svg": () => import("./milestone-24-CfndBd5D.js"), "../static/icons/mirror-24.svg": () => import("./mirror-24-B8nPpEXZ.js"), "../static/icons/moon-24.svg": () => import("./moon-24-BrId1bq2.js"), "../static/icons/mortar-board-24.svg": () => import("./mortar-board-24-BPgF53cm.js"), "../static/icons/move-to-bottom-24.svg": () => import("./move-to-bottom-24-WASzMnPu.js"), "../static/icons/move-to-end-24.svg": () => import("./move-to-end-24-IOVxYZOU.js"), "../static/icons/move-to-start-24.svg": () => import("./move-to-start-24-BUOdXW7H.js"), "../static/icons/move-to-top-24.svg": () => import("./move-to-top-24-Cm1_ZmF3.js"), "../static/icons/multi-select-24.svg": () => import("./multi-select-24-CgTpZ-Cq.js"), "../static/icons/mute-24.svg": () => import("./mute-24-BZvsoY0R.js"), "../static/icons/no-entry-24.svg": () => import("./no-entry-24-D3Tvoa-L.js"), "../static/icons/north-star-24.svg": () => import("./north-star-24-DCbY1-R8.js"), "../static/icons/note-24.svg": () => import("./note-24-BjXicI4u.js"), "../static/icons/number-24.svg": () => import("./number-24-u4L0AMkA.js"), "../static/icons/organization-24.svg": () => import("./organization-24-LWF-Q1ju.js"), "../static/icons/package-24.svg": () => import("./package-24-By-qgvLm.js"), "../static/icons/package-dependencies-24.svg": () => import("./package-dependencies-24-BKEHKHtj.js"), "../static/icons/package-dependents-24.svg": () => import("./package-dependents-24-0E687kgP.js"), "../static/icons/paper-airplane-24.svg": () => import("./paper-airplane-24-BhPBA6DG.js"), "../static/icons/paperclip-24.svg": () => import("./paperclip-24-xNLpGuIY.js"), "../static/icons/passkey-fill-24.svg": () => import("./passkey-fill-24-B5CNLTut.js"), "../static/icons/paste-24.svg": () => import("./paste-24-Bhlkxgic.js"), "../static/icons/pencil-24.svg": () => import("./pencil-24-iPLHeE6e.js"), "../static/icons/people-24.svg": () => import("./people-24-CeuLoLNW.js"), "../static/icons/person-24.svg": () => import("./person-24-DrD0wy-M.js"), "../static/icons/person-add-24.svg": () => import("./person-add-24-XjtSk5Xs.js"), "../static/icons/person-fill-24.svg": () => import("./person-fill-24-BdHYYIJe.js"), "../static/icons/pin-24.svg": () => import("./pin-24-CaZ583Vf.js"), "../static/icons/pin-slash-24.svg": () => import("./pin-slash-24-CnQ0hQZc.js"), "../static/icons/pivot-column-24.svg": () => import("./pivot-column-24-DQCCqi7R.js"), "../static/icons/play-24.svg": () => import("./play-24-C8nhfAZk.js"), "../static/icons/plug-24.svg": () => import("./plug-24-DWynSVLA.js"), "../static/icons/plus-24.svg": () => import("./plus-24-CQh2sLJC.js"), "../static/icons/plus-circle-24.svg": () => import("./plus-circle-24-CtL99qkQ.js"), "../static/icons/project-24.svg": () => import("./project-24-EPN8Giyo.js"), "../static/icons/project-roadmap-24.svg": () => import("./project-roadmap-24-B94oIHML.js"), "../static/icons/project-symlink-24.svg": () => import("./project-symlink-24-R2dt97hV.js"), "../static/icons/project-template-24.svg": () => import("./project-template-24-ZuRelh7b.js"), "../static/icons/pulse-24.svg": () => import("./pulse-24-CNw4zxOC.js"), "../static/icons/question-24.svg": () => import("./question-24-CWFz8MzT.js"), "../static/icons/quote-24.svg": () => import("./quote-24-B1pXrQ4R.js"), "../static/icons/read-24.svg": () => import("./read-24-LTNh1slz.js"), "../static/icons/rel-file-path-24.svg": () => import("./rel-file-path-24-DVTqJRx3.js"), "../static/icons/reply-24.svg": () => import("./reply-24-By2ijbX0.js"), "../static/icons/repo-24.svg": () => import("./repo-24-DXIc8edA.js"), "../static/icons/repo-clone-24.svg": () => import("./repo-clone-24-C5k-Talt.js"), "../static/icons/repo-forked-24.svg": () => import("./repo-forked-24-Du9ep_i_.js"), "../static/icons/repo-locked-24.svg": () => import("./repo-locked-24-v9bwAzsz.js"), "../static/icons/repo-pull-24.svg": () => import("./repo-pull-24-CUcyKjfD.js"), "../static/icons/repo-push-24.svg": () => import("./repo-push-24-DUkXXMa2.js"), "../static/icons/repo-template-24.svg": () => import("./repo-template-24-Djb-x-37.js"), "../static/icons/report-24.svg": () => import("./report-24-BbSG-5dP.js"), "../static/icons/rocket-24.svg": () => import("./rocket-24-CurAaQS_.js"), "../static/icons/rows-24.svg": () => import("./rows-24-Cl1ay-lh.js"), "../static/icons/rss-24.svg": () => import("./rss-24-D-3ZXac4.js"), "../static/icons/ruby-24.svg": () => import("./ruby-24-C_MqxDxO.js"), "../static/icons/screen-full-24.svg": () => import("./screen-full-24-DuAuKcQy.js"), "../static/icons/screen-normal-24.svg": () => import("./screen-normal-24-DiA_wJv6.js"), "../static/icons/search-24.svg": () => import("./search-24-BFBcWC6a.js"), "../static/icons/server-24.svg": () => import("./server-24-DbnU3RzZ.js"), "../static/icons/share-24.svg": () => import("./share-24-BYLz7DzL.js"), "../static/icons/share-android-24.svg": () => import("./share-android-24-C8nShkRF.js"), "../static/icons/shield-24.svg": () => import("./shield-24-cV1NFs1N.js"), "../static/icons/shield-check-24.svg": () => import("./shield-check-24-BKC0ybvE.js"), "../static/icons/shield-lock-24.svg": () => import("./shield-lock-24-0v-K1nms.js"), "../static/icons/shield-slash-24.svg": () => import("./shield-slash-24-FKt3Gk-n.js"), "../static/icons/shield-x-24.svg": () => import("./shield-x-24-BHbq-5kL.js"), "../static/icons/sidebar-collapse-24.svg": () => import("./sidebar-collapse-24-Dq38I1GH.js"), "../static/icons/sidebar-expand-24.svg": () => import("./sidebar-expand-24-BZwKdpVU.js"), "../static/icons/sign-in-24.svg": () => import("./sign-in-24-DT7C4j7S.js"), "../static/icons/sign-out-24.svg": () => import("./sign-out-24-I35oJyEZ.js"), "../static/icons/single-select-24.svg": () => import("./single-select-24-CM7qS8oo.js"), "../static/icons/skip-24.svg": () => import("./skip-24-B-nOnC8j.js"), "../static/icons/skip-fill-24.svg": () => import("./skip-fill-24-BSZFjNKg.js"), "../static/icons/smiley-24.svg": () => import("./smiley-24-DECMZCNS.js"), "../static/icons/sort-asc-24.svg": () => import("./sort-asc-24-CKN9xAUk.js"), "../static/icons/sort-desc-24.svg": () => import("./sort-desc-24-Ck5wX-dg.js"), "../static/icons/sponsor-tiers-24.svg": () => import("./sponsor-tiers-24-CpFPRs_y.js"), "../static/icons/square-24.svg": () => import("./square-24-i_DEBPvS.js"), "../static/icons/square-fill-24.svg": () => import("./square-fill-24-DO8u5iqc.js"), "../static/icons/squirrel-24.svg": () => import("./squirrel-24-g7Ep069f.js"), "../static/icons/stack-24.svg": () => import("./stack-24-C1KMKWW6.js"), "../static/icons/star-24.svg": () => import("./star-24-CmlNCh9j.js"), "../static/icons/star-fill-24.svg": () => import("./star-fill-24-DehtWN-f.js"), "../static/icons/stop-24.svg": () => import("./stop-24-BRAucF93.js"), "../static/icons/stopwatch-24.svg": () => import("./stopwatch-24-CHWBCC2q.js"), "../static/icons/strikethrough-24.svg": () => import("./strikethrough-24-t_206bVk.js"), "../static/icons/sun-24.svg": () => import("./sun-24-DP6I-5RI.js"), "../static/icons/sync-24.svg": () => import("./sync-24-BxFOtgUP.js"), "../static/icons/tab-24.svg": () => import("./tab-24-8wu8-U9V.js"), "../static/icons/table-24.svg": () => import("./table-24-CX47J7vb.js"), "../static/icons/tag-24.svg": () => import("./tag-24-BA8VXaDL.js"), "../static/icons/tasklist-24.svg": () => import("./tasklist-24-DkBJ7RVY.js"), "../static/icons/telescope-24.svg": () => import("./telescope-24-dMDSDPPS.js"), "../static/icons/telescope-fill-24.svg": () => import("./telescope-fill-24-Dx3ydwIM.js"), "../static/icons/terminal-24.svg": () => import("./terminal-24-CDuwo9N4.js"), "../static/icons/thumbsdown-24.svg": () => import("./thumbsdown-24-BbDOO9wP.js"), "../static/icons/thumbsup-24.svg": () => import("./thumbsup-24-CceCWpCA.js"), "../static/icons/tools-24.svg": () => import("./tools-24-JnSX5TzF.js"), "../static/icons/tracked-by-closed-completed-24.svg": () => import("./tracked-by-closed-completed-24-Os1jQrZt.js"), "../static/icons/tracked-by-closed-not-planned-24.svg": () => import("./tracked-by-closed-not-planned-24-oxsz4-9T.js"), "../static/icons/trash-24.svg": () => import("./trash-24-C5y4Y1B7.js"), "../static/icons/triangle-down-24.svg": () => import("./triangle-down-24-Br2b3UOs.js"), "../static/icons/triangle-left-24.svg": () => import("./triangle-left-24-CBVN7wis.js"), "../static/icons/triangle-right-24.svg": () => import("./triangle-right-24-C7njAgPf.js"), "../static/icons/triangle-up-24.svg": () => import("./triangle-up-24-FTEmTc7b.js"), "../static/icons/trophy-24.svg": () => import("./trophy-24-Byo9Ciwp.js"), "../static/icons/typography-24.svg": () => import("./typography-24-DAIzf1g_.js"), "../static/icons/unfold-24.svg": () => import("./unfold-24-BlIQV8mJ.js"), "../static/icons/unlink-24.svg": () => import("./unlink-24-Bxz9w6qq.js"), "../static/icons/unlock-24.svg": () => import("./unlock-24-tNszpEBm.js"), "../static/icons/unmute-24.svg": () => import("./unmute-24-zTj3Iy8s.js"), "../static/icons/unread-24.svg": () => import("./unread-24-DjQ8w1OE.js"), "../static/icons/unverified-24.svg": () => import("./unverified-24-rY_OVrW-.js"), "../static/icons/upload-24.svg": () => import("./upload-24-DQktryLS.js"), "../static/icons/verified-24.svg": () => import("./verified-24-Kj-pyxQ8.js"), "../static/icons/versions-24.svg": () => import("./versions-24-DfJsapfo.js"), "../static/icons/video-24.svg": () => import("./video-24-BhPYjvpl.js"), "../static/icons/workflow-24.svg": () => import("./workflow-24-BNqrslIa.js"), "../static/icons/x-24.svg": () => import("./x-24-DVMpr-oG.js"), "../static/icons/x-circle-24.svg": () => import("./x-circle-24-CDujoouP.js"), "../static/icons/x-circle-fill-24.svg": () => import("./x-circle-fill-24-DdtczcnA.js"), "../static/icons/zap-24.svg": () => import("./zap-24-Bn3sG3Ga.js"), "../static/icons/zoom-in-24.svg": () => import("./zoom-in-24-BXY8D9NL.js"), "../static/icons/zoom-out-24.svg": () => import("./zoom-out-24-sUxci5zW.js") });
C(V);
const N = [
  L,
  E,
  q,
  I
], O = (s) => {
  N.forEach((r) => {
    s.component(r.name, r);
  });
};
export {
  O as default
};
